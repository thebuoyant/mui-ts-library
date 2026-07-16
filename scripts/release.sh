#!/usr/bin/env bash
set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

ok()   { echo -e "${GREEN}  ✓${NC}  $1"; }
fail() { echo -e "${RED}  ✗${NC}  $1"; exit 1; }
info() { echo -e "${BLUE}  →${NC}  $1"; }
warn() { echo -e "${YELLOW}  !${NC}  $1"; }

echo ""
echo -e "${BOLD}  Release — @thebuoyant-tsdev/mui-ts-library${NC}"
echo "  ─────────────────────────────────────────────"
echo ""

# ── 1. Auf main? ──────────────────────────────────────────────────────────────
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  fail "Du bist auf Branch '$BRANCH', nicht auf 'main'.\n         Bitte erst mergen: git checkout main && git merge $BRANCH"
fi
ok "Branch:     main"

# ── 2. Git sauber? ────────────────────────────────────────────────────────────
if ! git diff --quiet || ! git diff --cached --quiet; then
  fail "Es gibt uncommittete Änderungen. Bitte zuerst committen."
fi
ok "Git:        Kein uncommitteter Stand"

# ── 3. Remote up-to-date? ─────────────────────────────────────────────────────
git fetch origin main --quiet
BEHIND=$(git rev-list HEAD..origin/main --count)
if [ "$BEHIND" -gt 0 ]; then
  fail "Dein lokaler main ist $BEHIND Commit(s) hinter origin/main.\n         Bitte zuerst: git pull origin main"
fi
ok "Remote:     Lokal ist aktuell"

# ── 4. Aktuelle Version anzeigen ──────────────────────────────────────────────
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo ""
ok "Version:    $CURRENT_VERSION (aktuell in package.json)"
echo ""

# ── 5. Version erhöhen? ───────────────────────────────────────────────────────
echo -e "${BOLD}  Version erhöhen?${NC}"
echo "    1)  patch  — Bugfix         (→ nächste x.x.PATCH)"
echo "    2)  minor  — Neues Feature  (→ nächste x.MINOR.0)"
echo "    3)  major  — Breaking       (→ nächste MAJOR.0.0)"
echo "    4)  keine  — Version so lassen (re-release)"
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
  DATE=$(date +"%Y-%m-%d")

  # Rename [Unreleased] → [NEW_VERSION] in changelogs + READMEs.
  # CHANGELOG: keep empty [Unreleased] above the new version (Keep-a-Changelog convention).
  # README:    replace [Unreleased] directly with the version — no empty section shown on npm.
  python3 - "$NEW_VERSION" "$DATE" <<'PYEOF'
import re, sys
ver, date = sys.argv[1], sys.argv[2]
# (filename, pattern, keep_unreleased_label_or_None, prefix)
files = [
    ('CHANGELOG.md',    r'## \[Unreleased\]',       '## [Unreleased]',       '##'),
    ('CHANGELOG.de.md', r'## \[Unveröffentlicht\]', '## [Unveröffentlicht]', '##'),
    ('README.md',       r'### \[Unreleased\]',       None,                    '###'),
    ('README.de.md',    r'### \[Unveröffentlicht\]', None,                    '###'),
]
for fname, pattern, label, prefix in files:
    try:
        content = open(fname).read()
        version_heading = f'{prefix} [{ver}] — {date}'
        if label:
            # CHANGELOG: preserve empty [Unreleased] + insert version below
            replacement = f'{label}\n\n---\n\n{version_heading}'
        else:
            # README: replace [Unreleased] directly with version (no empty section on npm)
            replacement = version_heading
        content = re.sub(pattern, replacement, content, count=1)
        open(fname, 'w').write(content)
    except FileNotFoundError:
        pass
PYEOF

  git add package.json package-lock.json CHANGELOG.md CHANGELOG.de.md README.md README.de.md
  git commit -m "chore: release v$NEW_VERSION"
  ok "Version:    $CURRENT_VERSION → $NEW_VERSION"
  ok "Changelog:  [Unreleased] → [$NEW_VERSION] — $DATE"
else
  NEW_VERSION=$CURRENT_VERSION
  warn "Version bleibt bei $NEW_VERSION (re-release — Tag wird überschrieben)"
fi

echo ""

# ── 6. Push → GitHub Actions übernimmt ───────────────────────────────────────
info "Pushe zu origin/main ..."
git push origin main

echo ""
ok "Push erledigt!"
echo ""
echo -e "${BOLD}  Was jetzt passiert (automatisch via GitHub Actions):${NC}"
echo "  1. Tests laufen durch (730+ Tests)"
echo "  2. Build wird erstellt"
echo "  3. GitHub Release v$NEW_VERSION wird angelegt"
echo "  4. Paket wird auf npm veröffentlicht"
echo ""
echo -e "${BLUE}  Status verfolgen:${NC}"
echo "  https://github.com/thebuoyant/mui-ts-library/actions"
echo ""
echo -e "${BLUE}  npm-Paket (nach ~3 min live):${NC}"
echo "  https://www.npmjs.com/package/@thebuoyant-tsdev/mui-ts-library"
echo ""
