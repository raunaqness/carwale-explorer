#!/usr/bin/env python3
"""Build web/seed.json (starter cars shipped to every visitor) from data/cars/*/.

Each entry has the same shape as the /api/car payload, so the browser stores both identically.
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Starter cars shipped to every new visitor (folder names under data/cars/). Other saved cars stay on disk.
STARTER = ["hyundai-venue", "kia-sonet", "skoda-kylaq", "honda-amaze"]


def apply_brochure_facts(car_id, variants, facts):
    """Add brochure-only facts (speaker brand, side-view cameras) to each variant's features. See data/brochure-facts.json."""
    spec = facts.get(car_id)
    if not spec:
        return
    for field, cfg in spec["fields"].items():
        for v in variants:
            feats = v["features"]
            if cfg.get("skip_if") and feats.get(cfg["skip_if"][0]) == cfg["skip_if"][1]:
                continue
            value = cfg["default"]
            for r in cfg["rules"]:
                hit = re.search(r["variant"], v["variant"]) if "variant" in r else feats.get(r["feature"][0]) == r["feature"][1]
                if hit:
                    value = r["value"]
                    if "expect" in r and feats.get(r["expect"][0]) != r["expect"][1]:
                        raise SystemExit(f"{car_id}: '{v['variant']}' is {value!r} per the brochure but CarWale says "
                                         f"{r['expect'][0]} = {feats.get(r['expect'][0])!r}, expected {r['expect'][1]!r}")
            feats[field] = value


def main():
    facts = json.loads((ROOT / "data" / "brochure-facts.json").read_text())
    cars = []
    for d in sorted((ROOT / "data" / "cars").iterdir()):
        if d.name not in STARTER:
            continue
        f, pf = d / "details.json", d / "prices-bangalore.json"
        if not f.exists() or not pf.exists():
            continue
        det = json.loads(f.read_text())
        brand, model = re.search(r"/([^/]+)-cars/([^/]+)/", det["overview"]["url"]).groups()
        prices = {str(r["id"]): [r["on_road"], r["ex_showroom"]] for r in json.loads(pf.read_text())["variants"]}
        apply_brochure_facts(d.name, det["variants"], facts)
        cars.append({"id": d.name, "brand": brand, "model": model, "overview": det["overview"],
                     "variants": det["variants"], "ratings": det["ratings"], "prices": {"bangalore": prices}})
    out = ROOT / "web" / "seed.json"
    out.write_text(json.dumps(cars, separators=(",", ":")))
    print("wrote", len(cars), "cars,", out.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
