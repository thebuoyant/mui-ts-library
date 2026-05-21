# Bibliothek lokal teilen — Anleitung für Kollegen

Die Datei `thebuoyant-tsdev-mui-ts-library-1.0.0.tgz` im Projektordner enthält die fertig gebaute Komponentenbibliothek und kann direkt in jedem React-Projekt installiert werden — ohne npm-Account, ohne Internet.

---

## Installation

### 1. Datei empfangen

Die `.tgz`-Datei per Slack, Teams, E-Mail oder Netzlaufwerk erhalten und an einem beliebigen Ort speichern.

### 2. Im Zielprojekt installieren

```bash
npm install /pfad/zur/thebuoyant-tsdev-mui-ts-library-1.0.0.tgz
```

Beispiele:

```bash
# Datei liegt im Downloads-Ordner
npm install ~/Downloads/thebuoyant-tsdev-mui-ts-library-1.0.0.tgz

# Datei liegt im selben Verzeichnis wie das Projekt
npm install ./thebuoyant-tsdev-mui-ts-library-1.0.0.tgz
```

### 3. Peer Dependencies installieren (falls noch nicht vorhanden)

```bash
npm install react@^19 @mui/material@^9 @emotion/react @emotion/styled
```

---

## Verwendung

```tsx
import {
  GanttChart,
  TagSelection,
  PasswordStrengthMeter,
  RichTextEditor,
} from '@thebuoyant-tsdev/mui-ts-library';
```

TypeScript-Typen sind automatisch verfügbar — kein separater `@types/...` Import nötig.

---

## Neue Version verteilen

Wenn eine neue Version der Bibliothek gebaut wurde, einfach die neue `.tgz`-Datei teilen. Im Zielprojekt:

```bash
npm install /pfad/zur/thebuoyant-tsdev-mui-ts-library-1.0.1.tgz
```

---

## `.tgz`-Datei neu erstellen

Im Bibliotheks-Projektordner:

```bash
npm pack
```

Erstellt eine neue `thebuoyant-tsdev-mui-ts-library-X.X.X.tgz` im Projektordner.
