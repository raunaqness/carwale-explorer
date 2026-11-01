# web/ (planned frontend)

Placeholder for a future interface. Everything it needs already exists as static data:

- `../data/cars/<brand>-<model>/details.json` - overview, every variant with specs and features, ratings, reviews
- `../data/cars/<brand>-<model>/prices-bangalore.json` - per-variant on-road and ex-showroom prices
- `../data/cars/<brand>-<model>/brochure.pdf`

A static site (e.g. Vite + React, or plain HTML/JS) can load these JSON files directly, so no backend is needed.
For live lookups of cars that are not saved yet, add a small API that wraps `carwale.py` (the functions
`brand_models`, `model_page`, `city_prices` etc. are importable).

## Current scaffold
Plain HTML/JS, no build step. Filters on the left, sortable variant table on the right.

```
python3 scripts/build_web_data.py      # regenerate web/data.json from data/cars/
python3 -m http.server -d web 8000     # open http://localhost:8000
```
