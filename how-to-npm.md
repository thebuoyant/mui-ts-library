# Wie man ein npm-Paket veröffentlicht — Schritt für Schritt

Diese Anleitung erklärt alles, was du brauchst, um dieses Projekt als öffentliches npm-Paket zu veröffentlichen — von der Account-Erstellung bis zum fertigen Release. Auch ohne Vorerfahrung verständlich.

---

## Was ist npm?

npm (Node Package Manager) ist der weltgrößte Marktplatz für JavaScript- und TypeScript-Pakete. Jedes Mal wenn du `npm install react` ausführst, lädst du ein Paket von npm herunter. Du kannst dort auch eigene Pakete hochladen, die andere dann installieren können.

Die npm-Website: **https://www.npmjs.com**

---

## Teil 1 — npm-Account erstellen

### 1.1 Account registrieren

1. Gehe auf **https://www.npmjs.com**
2. Klicke oben rechts auf **Sign Up**
3. Wähle einen **Username** — dieser wird dein Scope-Prefix.
   Dieses Projekt nutzt `@tsdev`, d.h. der Username lautet `tsdev`.
4. Gib deine E-Mail-Adresse und ein sicheres Passwort ein
5. Bestätige die E-Mail-Adresse (npm schickt dir eine Bestätigungsmail)

### 1.2 Two-Factor Authentication (2FA) aktivieren

npm verlangt 2FA für alle Veröffentlichungen. Ohne 2FA wirst du beim `npm publish` geblockt.

1. Melde dich auf npmjs.com an
2. Klicke oben rechts auf dein Avatar → **Account Settings**
3. Scrolle zu **Two-Factor Authentication**
4. Klicke **Enable 2FA**
5. Wähle eine Authenticator-App (z.B. **1Password**, **Authy**, oder **Google Authenticator**)
6. Scanne den QR-Code mit der App und gib den 6-stelligen Code ein

> **Warum ist das wichtig?** Ohne 2FA kann dein Account missbraucht werden, um Schadcode in deinem Namen zu veröffentlichen. npm hat das deshalb zur Pflicht gemacht.

---

## Teil 2 — Lokales Setup

### 2.1 Node.js und npm installieren (falls noch nicht vorhanden)

Prüfe ob Node.js installiert ist:

```bash
node --version   # sollte v18 oder höher sein
npm --version    # sollte v9 oder höher sein
```

Falls nicht: https://nodejs.org → LTS-Version herunterladen und installieren.

### 2.2 Im Terminal bei npm einloggen

```bash
npm login
```

npm öffnet automatisch den Browser für die Anmeldung. Nach erfolgreicher Anmeldung siehst du:

```
Logged in as tschlend on https://registry.npmjs.org/.
```

Prüfen ob der Login geklappt hat:

```bash
npm whoami
# Ausgabe: tschlend
```

---

## Teil 3 — Paket bauen und prüfen

### 3.1 Alles bauen

Vom Projekt-Root aus:

```bash
npm run build
```

Das erzeugt den `dist/`-Ordner mit drei Dingen:
- `dist/index.js` — modernes ESM-Bundle (für Vite, Webpack 5 etc.)
- `dist/index.cjs` — CommonJS-Bundle (für ältere Tools)
- `dist/index.d.ts` + Unterordner — TypeScript-Typen

### 3.2 Tests laufen lassen

Vor jeder Veröffentlichung sicherstellen, dass alle Tests grün sind:

```bash
npm run test:run
```

Erwartete Ausgabe: `Tests 260 passed (260)`

### 3.3 Vorschau: Was wird hochgeladen?

```bash
npm pack --dry-run
```

Das zeigt dir genau welche Dateien im Paket landen würden — **ohne** etwas hochzuladen. Aktuell sind das 33 Dateien (Bundle + TypeScript-Typen + README).

> **Tipp:** Führe `npm pack` (ohne `--dry-run`) aus um ein echtes `.tgz`-Archiv zu erstellen. Das kannst du lokal in einem anderen Projekt testen, bevor du veröffentlichst.

---

## Teil 4 — Ersten Release veröffentlichen

### 4.1 Veröffentlichen

```bash
npm publish --access public
```

`--access public` ist bei Scoped Packages (`@tsdev/...`) notwendig, weil diese standardmäßig als privat (kostenpflichtig) behandelt werden. Der Flag setzt das Paket auf öffentlich (kostenlos).

npm fragt dich nach deinem 2FA-Code aus der Authenticator-App.

Nach ein paar Sekunden siehst du:

```
npm notice Publishing to https://registry.npmjs.org/ with tag latest
+ @thebuoyant/mui-ts-library@1.0.0
```

Das Paket ist jetzt live unter:
**https://www.npmjs.com/package/@thebuoyant/mui-ts-library**

### 4.2 Installation im Zielprojekt testen

```bash
npm install @thebuoyant/mui-ts-library
```

```tsx
import { RichTextEditor, GanttChart } from '@thebuoyant/mui-ts-library';
```

---

## Teil 5 — Neue Versionen veröffentlichen

### Versionsnummern verstehen (Semantic Versioning / SemVer)

Jedes npm-Paket folgt dem Schema `MAJOR.MINOR.PATCH`:

```
1 . 2 . 3
│   │   └── PATCH  — Bugfix, nichts Bestehendes kaputt gemacht
│   └────── MINOR  — Neues Feature, aber abwärtskompatibel
└────────── MAJOR  — Breaking Change (alte API funktioniert nicht mehr)
```

**Beispiele:**
- Du hast einen Bug in `RichTextEditor` gefixt → `1.0.0` → `1.0.1` (Patch)
- Du hast `GanttChart` um ein neues Prop erweitert → `1.0.0` → `1.1.0` (Minor)
- Du hast `minHeight`/`maxHeight` durch `height` ersetzt → `1.0.0` → `2.0.0` (Major)

### Version hochzählen und veröffentlichen

```bash
# Bugfix
npm version patch
# → ändert package.json auf 1.0.1 und erstellt einen Git-Tag

# Neues Feature
npm version minor
# → ändert package.json auf 1.1.0

# Breaking Change
npm version major
# → ändert package.json auf 2.0.0
```

Danach veröffentlichen:

```bash
npm run build          # neu bauen
npm run test:run       # Tests grün?
npm publish --access public
git push origin main --tags   # Git-Tag auch ins Repo pushen
```

---

## Teil 6 — Automatisches Deployment mit GitHub Actions (optional)

Anstatt manuell zu publishen, kannst du GitHub Actions so einrichten, dass jeder Git-Tag automatisch ein Release auslöst.

### 6.1 npm Automation Token erstellen

1. Auf **npmjs.com** einloggen
2. Avatar → **Access Tokens**
3. **Generate New Token** → **Automation** (funktioniert ohne 2FA-Prompt, daher sicherer für CI)
4. Token kopieren (wird nur einmal angezeigt!)

### 6.2 Token in GitHub hinterlegen

1. Auf GitHub das Repository öffnen
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
   - Name: `NPM_TOKEN`
   - Value: das kopierte Token einfügen
4. **Add secret**

### 6.3 GitHub Actions Workflow anlegen

Datei `.github/workflows/publish.yml` erstellen:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'   # wird ausgelöst wenn ein Tag wie "v1.0.1" gepusht wird

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: npm ci
      - run: npm run test:run
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 6.4 Release auslösen

```bash
npm version patch        # package.json + Git-Tag
git push origin main --tags   # Tag pusht → GitHub Actions startet automatisch
```

---

## Zusammenfassung — Checkliste für jeden Release

```
[ ] npm run test:run       → alle Tests grün
[ ] npm run build          → dist/ aktuell
[ ] npm pack --dry-run     → Inhalt prüfen
[ ] npm version patch/minor/major
[ ] npm publish --access public
[ ] git push origin main --tags
```

---

## Häufige Fehler und Lösungen

| Fehler | Ursache | Lösung |
|---|---|---|
| `You must be logged in` | Nicht eingeloggt | `npm login` |
| `You do not have permission` | Paket gehört jemand anderem | Anderen Namen wählen oder Scope nutzen |
| `Cannot publish over existing version` | Version schon vorhanden | `npm version patch` und neu publishen |
| `402 Payment Required` | Scoped Package ohne `--access public` | `npm publish --access public` |
| `OTP required` | 2FA-Code fehlt | npm fragt automatisch, Code aus Authenticator-App eingeben |
| `private: true` in package.json | Paket als privat markiert | `"private": false` setzen |
