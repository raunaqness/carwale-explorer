#!/usr/bin/env python3
"""Build web/seed.json (starter cars shipped to every visitor) from data/cars/*/.

Each entry has the same shape as the /api/car payload, so the browser stores both identically.
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    cars = []
    for d in sorted((ROOT / "data" / "cars").iterdir()):
        f, pf = d / "details.json", d / "prices-bangalore.json"
        if not f.exists() or not pf.exists():
            continue
        det = json.loads(f.read_text())
        brand, model = re.search(r"/([^/]+)-cars/([^/]+)/", det["overview"]["url"]).groups()
        prices = {str(r["id"]): [r["on_road"], r["ex_showroom"]] for r in json.loads(pf.read_text())["variants"]}
        cars.append({"id": d.name, "brand": brand, "model": model, "overview": det["overview"],
                     "variants": det["variants"], "ratings": det["ratings"], "prices": {"bangalore": prices}})
    out = ROOT / "web" / "seed.json"
    out.write_text(json.dumps(cars, separators=(",", ":")))
    print("wrote", len(cars), "cars,", out.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
