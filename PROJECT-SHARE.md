# Bibliothek lokal teilen — Anleitung für Kollegen

Es gibt zwei Wege, die Bibliothek ohne npm-Account zu teilen:

| | Zweck |
|---|---|
| **`.tgz`-Datei** | Bibliothek als Dependency in ein React-Projekt einbinden |
| **Storybook-Docker-ZIP** | Komponenten interaktiv im Browser ansehen — kein Entwickler-Setup nötig |

---

## Option A — Komponenten-Bibliothek installieren (`.tgz`)

### `.tgz`-Datei erstellen

Im Bibliotheks-Projektordner:

```bash
npm pack
```

Erstellt `thebuoyant-tsdev-mui-ts-library-1.2.0.tgz` im Projektordner.
Die Datei per Slack, Teams, E-Mail oder Netzlaufwerk teilen.

> **Hinweis:** Die `.tgz`-Datei ist nicht im Git-Repository enthalten — sie muss nach jedem `npm pack` neu geteilt werden.

### Im Zielprojekt installieren

```bash
npm install /pfad/zur/thebuoyant-tsdev-mui-ts-library-1.2.0.tgz
```

Beispiele:

```bash
# Datei liegt im Downloads-Ordner
npm install ~/Downloads/thebuoyant-tsdev-mui-ts-library-1.2.0.tgz

# Datei liegt im selben Verzeichnis wie das Projekt
npm install ./thebuoyant-tsdev-mui-ts-library-1.2.0.tgz
```

### Peer Dependencies installieren (falls noch nicht vorhanden)

```bash
npm install react@^19 @mui/material@^9 @emotion/react @emotion/styled
```

### Verwendung

```tsx
import {
  ConfirmDialogProvider,
  useConfirm,
  GanttChart,
  TagSelection,
  PasswordStrengthMeter,
  RichTextEditor,
  SqlEditor,
} from "@thebuoyant-tsdev/mui-ts-library";
```

TypeScript-Typen sind automatisch verfügbar — kein separater `@types/...`-Import nötig.

### Neue Version verteilen

Einfach `npm pack` erneut ausführen und die neue `.tgz`-Datei teilen. Im Zielprojekt:

```bash
npm install /pfad/zur/thebuoyant-tsdev-mui-ts-library-x.y.z.tgz
```

---

## Option B — Storybook als Docker-Container (für Nicht-Entwickler)

Ideal für Product Owner, Designer oder andere Stakeholder, die die Komponenten interaktiv sehen möchten — ohne React, Node.js oder eine Entwicklungsumgebung zu installieren. Einzige Voraussetzung: **Docker Desktop**.

### Storybook-ZIP erstellen

```bash
npm run build-storybook-docker
```

Erstellt `storybook-docker/storybook-1.2.0.zip` — enthält ein vorgefertigtes Docker-Image und Startskripte.

### ZIP weitergeben

Die ZIP-Datei per Slack, Teams, E-Mail oder Netzlaufwerk teilen.

### Empfänger-Anleitung (Kurzfassung)

1. ZIP entpacken
2. **macOS:** `./start.sh` im Terminal ausführen — **Windows:** `start.bat` doppelklicken
3. `http://localhost:6006` im Browser öffnen

Die vollständige Schritt-für-Schritt-Anleitung liegt als `how-to.md` (EN) und `how-to.de.md` (DE) direkt im ZIP.
