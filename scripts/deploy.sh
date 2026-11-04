#!/usr/bin/env bash
# Deploy the committed code to the VPS. Runs on YOUR machine; nothing is installed or stored anywhere else.
#
#   scripts/deploy.sh            push main to GitHub, update the VPS, rebuild, check the live site
#   scripts/deploy.sh --no-push  skip the push (the VPS pulls whatever is already on GitHub)
#
# Needs: ssh access to the host alias below (from ~/.ssh/config) and the GitHub key below for pushing.
# Override any of these in the environment, e.g. VPS_HOST=other scripts/deploy.sh
set -euo pipefail

VPS_HOST="${VPS_HOST:-netcup}"
VPS_DIR="${VPS_DIR:-cars-explorer}"                                   # repo location on the VPS, relative to its home
SITE="${SITE:-https://cars-explorer.raunaqness.com}"
GIT_KEY="${GIT_KEY:-$HOME/.ssh/id_ed25519_raunaqness}"                 # the key for the raunaqness GitHub account
REMOTE_URL="${REMOTE_URL:-git@github.com:raunaqness/carwale-explorer.git}"
COMPOSE="docker compose -f docker-compose.yml -f docker-compose.shared-tunnel.yml"

cd "$(git rev-parse --show-toplevel)"

push=1
[ "${1:-}" = "--no-push" ] && push=0

step() { printf '\n==> %s\n' "$*"; }
die()  { printf 'error: %s\n' "$*" >&2; exit 1; }

branch="$(git rev-parse --abbrev-ref HEAD)"
[ "$branch" = "main" ] || die "you are on '$branch'; deploys go from main"

# Only committed code is deployed (the VPS pulls from GitHub), so uncommitted changes would be silently left out.
if [ -n "$(git status --porcelain)" ]; then
  git status --short
  die "uncommitted changes above. Commit them first, or they will not be deployed."
fi

if [ "$push" = 1 ]; then
  step "Pushing main to GitHub"
  [ -r "$GIT_KEY" ] || die "GitHub key not found at $GIT_KEY (set GIT_KEY=...)"
  GIT_SSH_COMMAND="ssh -o IdentitiesOnly=yes -o BatchMode=yes -i $GIT_KEY" git push "$REMOTE_URL" main
fi

want="$(git rev-parse --short HEAD)"

step "Updating $VPS_HOST ($VPS_DIR) and rebuilding"
# Everything between the quotes runs on the VPS. --ff-only refuses to merge, so a diverged copy fails loudly.
ssh -o BatchMode=yes "$VPS_HOST" "set -euo pipefail
  cd '$VPS_DIR'
  git pull --ff-only -q
  echo \"VPS is now at \$(git rev-parse --short HEAD)\"
  $COMPOSE up -d --build
  docker image prune -f >/dev/null
  $COMPOSE ps"

step "Checking $SITE"
ok=0
for i in 1 2 3 4 5 6; do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$SITE/" || true)"
  if [ "$code" = "200" ]; then ok=1; break; fi
  echo "  attempt $i: HTTP ${code:-none}, retrying..."; sleep 5
done
[ "$ok" = 1 ] || die "site did not return 200. On the VPS: ssh $VPS_HOST 'cd $VPS_DIR && $COMPOSE logs --tail 50'"

# Static assets carry a content hash (?v=...), so the page referencing fresh hashes means the new build is what is being served.
echo "  home page: HTTP 200"
echo "  assets:    $(curl -s --max-time 10 "$SITE/" | grep -o '[a-z]*\.\(js\|css\)?v=[0-9a-f]*' | tr '\n' ' ')"

step "Deployed $want to $SITE"
