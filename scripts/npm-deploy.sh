#!/usr/bin/env bash
set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

ok()   { echo -e "${GREEN}  OK${NC}  $1"; }
fail() { echo -e "${RED}  FAIL${NC}  $1"; exit 1; }
info() { echo -e "${BLUE}  --${NC}  $1"; }

echo ""
echo -e "${BOLD}  npm Deploy — @tschlend/mui-ts-library${NC}"
echo "  ─────────────────────────────────────────"
echo ""

# ── 1. npm User prüfen ────────────────────────────────────────────────────────
EXPECTED_USER="tsdev"
CURRENT_USER=$(npm whoami 2>/dev/null || echo "")

if [ "$CURRENT_USER" != "$EXPECTED_USER" ]; then
  fail "npm User ist '${CURRENT_USER:-nicht eingeloggt}', erwartet: '$EXPECTED_USER'\n         Bitte zuerst einloggen: ${YELLOW}npm login${NC}"
fi

ok "npm User:  $CURRENT_USER"

# ── 2. Git-Status prüfen ──────────────────────────────────────────────────────
if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "Es gibt uncommittete Änderungen. Bitte zuerst committen."
fi

ok "Git:       Kein uncommitteter Stand"

# ── 3. Aktuelle Version anzeigen ──────────────────────────────────────────────
CURRENT_VERSION=$(node -p "require('./package.json').version")
ok "Version:   $CURRENT_VERSION"
echo ""

# ── 4. Version erhöhen? ───────────────────────────────────────────────────────
echo -e "${BOLD}  Version erhöhen?${NC}"
echo "    1)  patch  — Bugfix         (→ nächste x.x.PATCH)"
echo "    2)  minor  — Neues Feature  (→ nächste x.MINOR.0)"
echo "    3)  major  — Breaking       (→ nächste MAJOR.0.0)"
echo "    4)  keine  — Version so lassen"
echo ""
read -rp "  Auswahl [1-4]: " choice
echo ""

case $choice in
  1) BUMP="patch" ;;
  2) BUMP="minor" ;;
  3) BUMP="major" ;;
  4) BUMP="" ;;
  *)
    fail "Ungültige Auswahl."
    ;;
esac

if [ -n "$BUMP" ]; then
  npm version "$BUMP" --no-git-tag-version
  NEW_VERSION=$(node -p "require('./package.json').version")
  git add package.json package-lock.json
  git commit -m "chore: release v$NEW_VERSION"
  git tag "v$NEW_VERSION"
  ok "Neue Version: $NEW_VERSION"
  echo ""
else
  NEW_VERSION=$CURRENT_VERSION
  info "Version bleibt bei $NEW_VERSION"
  echo ""
fi

# ── 5. Veröffentlichen ────────────────────────────────────────────────────────
echo -e "${BLUE}  Publiziere v${NEW_VERSION} ...${NC}"
info "prepublishOnly läuft automatisch: Tests → Build → Publish"
echo ""

npm publish

# ── 6. Git push ───────────────────────────────────────────────────────────────
echo ""
git push origin main --tags

echo ""
echo -e "${GREEN}  Fertig!${NC}  Version $NEW_VERSION ist live:"
echo "           https://www.npmjs.com/package/@tschlend/mui-ts-library"
echo ""
