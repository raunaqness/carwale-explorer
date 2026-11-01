#!/usr/bin/env python3
"""Stateless web server: serves web/ and a small JSON API over CarWale.

Nothing is written to disk. All user data (saved cars, prices, preferences) lives in the
visitor's browser. The only server-side state is a small in-memory page cache.

  GET /api/search?q=creta                       models matching the query
  GET /api/cities                               all cities with their state
  GET /api/car?brand=hyundai&model=creta        full car payload incl. Bangalore prices
  GET /api/prices?brand=&model=&city=pune       per-variant prices for one car in one city

Usage: python3 scripts/serve.py [port]
"""
import argparse, json, os, re, sys, threading
os.environ.setdefault("CARWALE_CACHE", "memory")
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
import carwale

SLUG = re.compile(r"[a-z0-9][a-z0-9-]{0,60}")
_cities = None
_cities_lock = threading.Lock()


def cities():
    global _cities
    with _cities_lock:
        if _cities is None:
            raw = json.loads(carwale.fetch_html("/api/cities/"))
            _cities = sorted(({"name": c["CityName"], "slug": c["CityMaskingName"], "state": c["StateName"] or "Other",
                               "popular": bool(c["IsPopular"])} for c in raw if not c["IsDeleted"] and c["CityMaskingName"]),
                             key=lambda c: (c["state"], c["name"]))
        return _cities


def price_map(brand, model, city):
    cp = carwale.city_prices(brand, model, city)
    return {str(r["id"]): [r["on_road"], r["ex_showroom"]] for r in cp["variants"]}


def car_payload(brand, model):
    ns = argparse.Namespace(brand=brand, model=model)
    b, mp = carwale.model_page(brand, model)
    overview = carwale.cmd_model(ns)
    ratings = carwale.cmd_reviews(argparse.Namespace(brand=brand, model=model, pages=1))["summary"]
    m = carwale.slug(model)
    return {
        "id": f"{b}-{m}", "brand": b, "model": m,
        "overview": overview,
        "variants": [carwale.variant_row(v) for v in mp["versions"]],
        "ratings": ratings,
        "prices": {"bangalore": price_map(brand, model, "bangalore")},
    }


class Handler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = urlparse(path).path
        f = (ROOT / "web" / p.lstrip("/")).resolve()
        if not str(f).startswith(str(ROOT / "web")) or p.endswith("/"):
            f = ROOT / "web" / "index.html"
        return str(f)

    def log_message(self, *a):  # no access logs: nothing about visitors is recorded
        pass

    def reply(self, code, obj):
        body = json.dumps(obj, separators=(",", ":")).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        u = urlparse(self.path)
        if not u.path.startswith("/api/"):
            return super().do_GET()
        q = {k: v[0].strip() for k, v in parse_qs(u.query).items()}
        try:
            if u.path == "/api/cities":
                return self.reply(200, cities())
            if u.path == "/api/search":
                if len(q.get("q", "")) < 2 or len(q["q"]) > 60:
                    return self.reply(200, [])
                res = carwale.cmd_search(argparse.Namespace(query=q["q"]))
                return self.reply(200, [{"brand": m["brand"], "brand_slug": m["brand_slug"], "model": m["model"],
                                         "slug": m["slug"], "price": m["price"]} for m in res])
            if u.path in ("/api/car", "/api/prices"):
                brand, model, city = q.get("brand", ""), q.get("model", ""), q.get("city", "bangalore")
                if not all(SLUG.fullmatch(x) for x in (brand, model, city)):
                    return self.reply(400, {"error": "bad parameters"})
                if u.path == "/api/car":
                    return self.reply(200, car_payload(brand, model))
                return self.reply(200, {"variants": price_map(brand, model, city)})
            return self.reply(404, {"error": "not found"})
        except carwale.CarWaleError as e:
            return self.reply(404, {"error": str(e)})
        except Exception as e:
            return self.reply(502, {"error": str(e)})


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", 8000))
    print(f"http://localhost:{port}", flush=True)
    ThreadingHTTPServer(("", port), Handler).serve_forever()
