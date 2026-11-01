# cars-explorer: project context

Tool and dataset for fetching car details from carwale.com, comparing variants, and (planned) a frontend. See `README.md` for usage. This file records the decisions and gotchas from the session that built it, so a fresh session can continue.

## What exists
- `carwale.py`: stdlib-only Python CLI and library. CarWale has no public API; each page embeds its data as JSON in `window.__INITIAL_STATE__`, which is parsed directly (no HTML scraping). Commands: `brands`, `search`, `brand`, `model`, `variants`, `variant`, `reviews`, `expert-reviews`, `city-prices`, `download`.
- `data/cars/<brand>-<model>/`: `details.json`, `details.md`, `prices-bangalore.json`, `brochure.pdf` for Hyundai Creta, Kia Sonet, Honda Elevate, Skoda Kylaq, Honda Amaze, Kia Syros, Hyundai Venue (base models only; not N Line, EV, Electric, etc.).
- `scripts/compare.py` -> `reports/automatic-variants-comparison.md`: one table per car, automatic variants only, first row lists everything, later rows list only the differences versus a reference variant (previous variant with the same engine+gearbox, otherwise the base variant).
- `scripts/under_budget.py [rupees]` -> `reports/variants-under-15-lakh-bangalore.md`: automatic variants with Bangalore on-road price below the limit (default Rs. 15 lakh), laid out compactly for a narrow side panel.
- `reports/creta-automatic-variants.md`: an earlier one-off Creta report (uses average ex-showroom prices, hand-generated; not produced by a script).
- `web/`: the frontend (plain HTML/JS, no build). Filters on the left, car thumbnails + sortable variant table on the right. All user data (saved cars, per-city prices, hidden cars, selected city) is stored in the visitor's browser (IndexedDB + localStorage); `web/seed.json` ships the starter cars. Has Export/Import/Clear.
- `scripts/serve.py`: stateless server (serves `web/` + `/api/search|cities|car|prices`). Writes nothing to disk (`CARWALE_CACHE=memory`). `scripts/build_seed.py` regenerates `web/seed.json` from `data/cars/`.
- `aestudio.studio-DESIGN.md`: design inspiration doc the UI styling (`web/style.css`) is adapted from: warm parchment palette, Georgia headings + system sans, sharp corners, pill secondary buttons, warm shadows. Only the parts that fit a dense data table are used (no 129px hero type or 2-column marketing grid).
- `Dockerfile`, `docker-compose.yml`, `DEPLOY.md`: VPS + Cloudflare Tunnel deployment; see DEPLOY.md, which also sketches the planned `/api/ask` LLM (OpenRouter) endpoint. Not yet tested with real Docker (not installed locally).

## Decisions and assumptions (user's wording was ambiguous; revisit if wrong)
- "Kia Seros" was taken to mean **Kia Syros**; ".mp file" was taken to mean **Markdown**.
- "ex-on-road price under 15 lakh" was taken to mean **Bangalore on-road price** below Rs. 15 lakh.
- "Automatic" means gearbox label starting with "Automatic" (CVT, DCT, TC). Kia Sonet's **Clutchless Manual (IMT)** variants are excluded.
- Prices are **Bangalore city-level**. CarWale has no HSR Layout area option for Bangalore (`isAreaAvailable` is false; area URLs 404). Do not claim area-level prices.
- The `Alloy Wheels` field is excluded from comparisons: CarWale fills it for only some variants, producing false "adds/drops".
- Survey-style rating parameters (labels ending in `?`) are filtered from review summaries.
- Comparison "what you get" uses only the ~33 per-variant fields CarWale lists. Cosmetic differences between trims (Knight / King / Lounge, dual-tone) often show as "no difference". Brochure PDFs were saved but **never parsed**, so no brochure data feeds the reports.

## Gotchas
- The cloud sandbox network policy needed these hosts allowed: `www.carwale.com` (pages) and `stc.aeplcdn.com` (brochure PDFs). Without the second, brochure downloads fail with 403 (the failure is recorded in `details.json`).
- CarWale needs a browser-like `User-Agent`; the CLI sets one. Responses are cached for an hour in `~/.cache/cars-explorer`.
- Pages can change; if parsing breaks, inspect `window.__INITIAL_STATE__` (keys seen: `modelPage`, `makePage`, `userReviewListing`, `priceInCityPage`, `newCars`).
- Review pagination uses `?page=N`. City prices come from `/<brand>-cars/<model>/price-in-<city>/` (`priceInCityPage.versions[].priceOverview`, joined to saved variants by `versionId`).
- Refresh data: `python3 carwale.py download <brand> <model> --city bangalore`, then rerun the two scripts. Run everything from the repo root.
- Brochures add about 57 MB to the repo. Consider ignoring or Git LFS if size becomes a problem.

## Next steps
- Build the "ask a question" LLM box (see DEPLOY.md). Port the report's "differences vs previous variant" view to the frontend.
- Cleanup pending, needs user confirmation: the same CLI also exists in the `carwale-cli/` folder on branch `add-carwale-cli` of `raunaqness/raunaqness.github.io` (about 60 MB of brochures). The user moved to this repo and may want that folder removed.

Origin: built in a Claude Code cloud session, https://claude.ai/code/session_018KkCh3ew9T3AgV4bzktNez
