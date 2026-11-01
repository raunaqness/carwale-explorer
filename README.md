# carwale-explorer

Fetch car details from [carwale.com](https://www.carwale.com) (models, variants, specs, features, prices, user and expert reviews, brochures) and build comparison reports from them.

CarWale has no public API. Each page embeds its data as JSON (`window.__INITIAL_STATE__`), which `carwale.py` reads. If CarWale changes its pages, parsing may break. Check CarWale's terms of use before heavy or commercial use. Responses are cached for an hour in `~/.cache/carwale-explorer`.

Requires Python 3.9+. No dependencies. Run everything from the repo root.

## Layout

```
carwale.py            CLI + fetching/parsing library
scripts/
  compare.py          builds reports/automatic-variants-comparison.md
  under_budget.py     builds reports/variants-under-15-lakh-bangalore.md
data/cars/<car>/      details.json, details.md, prices-bangalore.json, brochure.pdf
reports/              generated Markdown reports
web/                  placeholder for a future frontend (see web/README.md)
```

## CLI

```
python3 carwale.py brands
python3 carwale.py search "hyundai creta"
python3 carwale.py brand hyundai
python3 carwale.py model maruti-suzuki swift
python3 carwale.py variants maruti-suzuki swift
python3 carwale.py variant maruti-suzuki swift lxi-petrol-manual --specs
python3 carwale.py reviews tata nexon --pages 3
python3 carwale.py expert-reviews maruti-suzuki swift
python3 carwale.py city-prices honda amaze --city bangalore
python3 carwale.py download hyundai creta --city bangalore   # saves into data/cars/hyundai-creta/
```

Add `--json` before the command for JSON output.

## Reports

```
python3 scripts/compare.py                  # what each automatic variant adds over the previous one
python3 scripts/under_budget.py [rupees]    # automatic variants under a Bangalore on-road budget (default 1500000)
```

## Notes

- Prices are CarWale's city-level figures. For Bangalore there is no area (e.g. HSR Layout) option. On-road = ex-showroom + RTO/road tax, insurance, TCS, FASTag and other charges; accessories, warranty extensions and discounts are excluded.
- Variant features are the ~33 fields CarWale lists per variant, so cosmetic trim differences may not appear.
- Cars currently saved: Hyundai Creta, Kia Sonet, Honda Elevate, Skoda Kylaq, Honda Amaze, Kia Syros, Hyundai Venue. Brochures add about 60 MB.
