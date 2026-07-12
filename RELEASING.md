# Release-Guide — @thebuoyant-tsdev/mui-ts-library

Dieses Dokument erklärt Schritt für Schritt, wie ein neues Release veröffentlicht wird.  
Kein Vorwissen nötig — einfach der Reihe nach folgen.

---

## Übersicht: Wie funktioniert das Release-System?

```
Du (Terminal)          GitHub Actions (CI)          npm Registry
─────────────          ──────────────────          ─────────────
npm run release   →    Tests laufen              
                       Build wird erstellt       
                       GitHub Release anlegen    →  npm publish ✓
```

Du machst **einen Befehl** im Terminal. GitHub erledigt den Rest automatisch.

---

## Einmaliger Setup (NPM_TOKEN)

> Nur nötig, wenn das Token neu erstellt werden muss (Ersteinrichtung oder Token abgelaufen).

### Schritt 1 — Token auf npmjs.com erstellen

1. Geh zu **npmjs.com** → einloggen
2. Oben rechts: Avatar → **"Access Tokens"**
3. Klick **"Generate New Token"** → **"Granular Access Token"**
4. Felder ausfüllen:
   - **Token name**: `github-actions-publish` (oder beliebig)
   - **Expiration**: `90 days` (Maximum für Read/Write-Tokens)
   - **Packages and scopes → Permissions**: `Read and write`
   - **Packages and scopes → Select packages**: `All packages`
   - **Organizations → Permissions**: `No access` ← wichtig, sonst Fehler!
5. Klick **"Generate token"**
6. **Token sofort kopieren** — er wird nur einmal angezeigt!

> **Warum 90 Tage?** Granular Access Tokens mit Read/Write dürfen maximal 90 Tage gültig sein.  
> Das Token läuft also ab — Erinnerung im Kalender eintragen!

### Schritt 2 — Token in GitHub hinterlegen

1. Geh zu: **github.com/thebuoyant/mui-ts-library**
2. Tab **"Settings"** (im Repo, nicht in deinem Profil!)
3. Links: **"Secrets and variables"** → **"Actions"**
4. Klick auf **"NPM_TOKEN"** → **"Update secret"** (oder "New repository secret" bei Ersteinrichtung)
5. Token einfügen → **"Update secret"**

---

## Normaler Release-Ablauf

### Voraussetzungen

- Du bist auf dem `main`-Branch
- Alle Features sind committet und gepusht
- CHANGELOG.md und CHANGELOG.de.md sind aktuell

### Release starten

```bash
npm run release
```

Das Script fragt dich nach der gewünschten Version:

```
  Release — @thebuoyant-tsdev/mui-ts-library
  ─────────────────────────────────────────────

  ✓  Branch:     main
  ✓  Git:        Kein uncommitteter Stand
  ✓  Remote:     Lokal ist aktuell

  ✓  Version:    3.25.0 (aktuell in package.json)

  Version erhöhen?
    1)  patch  — Bugfix         (→ nächste x.x.PATCH)
    2)  minor  — Neues Feature  (→ nächste x.MINOR.0)
    3)  major  — Breaking       (→ nächste MAJOR.0.0)
    4)  keine  — Version so lassen (re-release)

  Auswahl [1-4]:
```

Wähle z.B. `2` für ein neues Feature → Script bumpt auf `3.26.0`, committet und pusht.

**Danach läuft GitHub Actions automatisch:**

| Schritt | Was passiert | Dauer |
|---------|-------------|-------|
| Tests | 730+ Tests laufen durch | ~60s |
| Build | Vite + TypeScript kompiliert | ~30s |
| GitHub Release | Tag + Release wird angelegt | ~5s |
| npm publish | Paket wird veröffentlicht | ~10s |
| **Gesamt** | | **~3 Minuten** |

### Status verfolgen

- GitHub Actions: **github.com/thebuoyant/mui-ts-library/actions**
- npm-Paket: **npmjs.com/package/@thebuoyant-tsdev/mui-ts-library**

---

## Re-Release (gleiche Version nochmal publishen)

Falls ein Release fehlgeschlagen ist (z.B. Token abgelaufen) und du die gleiche Version nochmal publishen willst:

1. Geh zu **GitHub → Actions → Release** Workflow
2. Klick **"Run workflow"**
3. Bei **"Tag to (re-)release"** nichts eintragen (leer lassen)
4. **"Run workflow"** klicken

> Das Script erkennt: Tag existiert bereits → überspringt GitHub Release → publisht nur auf npm.  
> *(Tipp: Das Tag muss manuell gelöscht werden, wenn auch der GitHub Release neu erstellt werden soll.)*

---

## Token erneuern (alle 90 Tage)

Das aktuelle Token läuft am **10. Oktober 2026** ab.

Gehe dann einfach zu [Einmaliger Setup](#einmaliger-setup-npm_token) und wiederhole die Schritte 1 und 2.  
Das ist der einzige Wartungsaufwand.

---

## Troubleshooting

### `npm error 403 Forbidden`

**Ursache:** Das NPM_TOKEN hat keine Publish-Berechtigung (Read-only oder abgelaufen).

**Fix:**
1. Neues Token auf npmjs.com erstellen (Typ: Granular, Packages: Read and write)
2. Token in GitHub Secrets aktualisieren
3. Workflow manuell neu starten

### `npm error ENEEDAUTH`

**Ursache:** Kein Token hinterlegt oder falsch gesetzt.

**Fix:** Prüfe, ob `NPM_TOKEN` in den Repository Secrets vorhanden ist (Settings → Secrets and variables → Actions).

### `Invalid expiration value. Read-write tokens can only be valid for up to 90 days.`

**Ursache:** Du hast bei der Token-Erstellung ein Datum nach mehr als 90 Tagen eingetragen.

**Fix:** Wähle im Expiration-Dropdown `90 days` statt einem manuellen Datum.

### `You must select at least one organization if granting organization permissions to this token.`

**Ursache:** Im Token-Formular ist unter "Organizations → Permissions" `Read and write` ausgewählt, aber du hast keine Organisationen.

**Fix:** Organizations → Permissions auf `No access` setzen.

### GitHub Actions läuft, aber npm publish schlägt fehl — `skip=true`

**Ursache:** Der Tag existiert bereits (z.B. v3.25.0), also überspringt die CI den Release.

**Fix:** Workflow manuell über "Run workflow" starten — das ignoriert den skip-Check nicht direkt, aber du kannst den Tag manuell löschen:
```bash
git tag -d v3.25.0
git push origin :refs/tags/v3.25.0
```
Dann nochmal `npm run release` mit Option `4` (keine Versionsänderung).

---

## Dateien im Überblick

| Datei | Zweck |
|-------|-------|
| `.github/workflows/release.yml` | GitHub Actions Workflow: Tests → Build → GitHub Release → npm publish |
| `scripts/release.sh` | Lokales Script: Version bumpen → pushen → CI triggern |
| `scripts/npm-deploy.sh` | Alternatives Script für lokales Publishing (erfordert `npm login`) |
| `RELEASING.md` | Diese Datei |
