# Deploying (Docker on a VPS + Cloudflare Tunnel)

The server is stateless. It serves the static page and a small JSON API that fetches and parses
carwale.com. Nothing is written to disk and there is no database. Each visitor's saved cars, prices
and preferences live in their own browser (IndexedDB + localStorage).

## Steps
1. Cloudflare Zero Trust > Networks > Tunnels > create a tunnel, copy its token.
2. In the tunnel's *Public hostname* tab add your domain/subdomain with service `http://app:8000`.
3. On the VPS: `cp .env.example .env`, paste the token, then `docker compose up -d --build`.
4. Cloudflare dashboard > Security > WAF > Rate limiting: limit `/api/*` (e.g. 60 requests/min per IP).
   Every API call makes the VPS hit carwale.com, so this protects both you and CarWale.

## Privacy and limits
- The server keeps no logs of requests (access logging is off) and sets no cookies. A short-lived,
  in-memory cache of CarWale pages is the only state; a restart clears it.
- Cloudflare itself can still see traffic to your domain; configure its analytics/logging to taste.
- Clearing browser data deletes a visitor's saved cars. The page has Export / Import for backups.
- All CarWale requests come from the VPS IP. If CarWale rate-limits it, add/search will fail.
  Scraping carwale.com may breach its terms; consider that before making the site public.

## Refreshing the starter cars
`python3 carwale.py download <brand> <model> --city bangalore`, then `python3 scripts/build_seed.py`,
commit `web/seed.json` and rebuild the image.

## Local run
`python3 scripts/serve.py` then open http://localhost:8000.

## Planned: "ask a question" box (LLM via OpenRouter)
Designed in, not built yet:
- The browser builds the context (the cars/variants/city currently shown, plus the question) from its
  own IndexedDB data and POSTs it to a new `POST /api/ask`.
- The server adds a system prompt, calls OpenRouter with `OPENROUTER_API_KEY` (an env var on the app
  container, never sent to the browser), and streams the answer back. It stores nothing.
- Needs: a hard cap on request/context size, a model allow-list, Cloudflare rate limiting on
  `/api/ask`, and a monthly spend limit on the OpenRouter key. If the container filesystem stays
  read-only this needs no other change. Note that the question and context pass through the server
  and OpenRouter, so the privacy note should say so.
