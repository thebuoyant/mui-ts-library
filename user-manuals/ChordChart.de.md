# ChordChart — Benutzerhandbuch

> [English Version →](ChordChart.md)

**Beziehungen und Flüsse zwischen Gruppen auf einen Blick sichtbar machen — Hover über eine Gruppe hebt deren Verbindungen hervor.** `ChordChart` für Abhängigkeitskarten, Migrationsflüsse, Handelsbeziehungen oder alle Quelle→Ziel-Daten einsetzen, bei denen Richtung und Stärke der Flüsse wichtig sind.

## Überblick

Der `ChordChart` visualisiert **Flüsse zwischen benannten Gruppen** als Kreisdiagramm — Gruppen werden als Arc-Segmente um den Kreis dargestellt, die Flüsse zwischen ihnen als verbindende Bänder. Er ist die zweite Komponente der **D3-Charts-Familie**.

**Typische Einsatzgebiete:**

- Team- oder Modul-Abhängigkeitskarten
- Migrationsflüsse zwischen Systemen oder Regionen
- Handels- oder Kommunikationsflüsse zwischen Parteien
- Beliebige gerichtete oder ungerichtete Quelle→Ziel-Beziehungen mit numerischem Gewicht

| ✨ Neu in v2.3.0 | |
|---|---|
| **ChordChart** | D3 Fluss-Chart — Arc-Gruppen, Bänder, Hover-Highlight, gerichtet/ungerichtet |

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `d3` | 7.x |

---

## Import

```tsx
import { ChordChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  ChordChartData,
  ChordChartProps,
  ChordGroupInfo,
  ChordInfo,
  ChordSortBy,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { ChordChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { ChordChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: ChordChartData[] = [
  { source: 'Frontend',  target: 'Backend',  value: 45 },
  { source: 'Backend',   target: 'Frontend', value: 20 },
  { source: 'Backend',   target: 'DevOps',   value: 35 },
  { source: 'DevOps',    target: 'Backend',  value: 12 },
];

function App() {
  return (
    <ChordChart
      data={data}
      size={500}
      onGroupClick={(info) => console.log(info.name, info.valueOut)}
      onChordClick={(info) => console.log(info.source.name, '→', info.target.name)}
    />
  );
}
```

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `ChordChartData[]` | — | **Pflichtfeld.** Array aus Flow-Links `{ source, target, value }` |
| `size` | `number` | `500` | Breite und Höhe des SVG in Pixeln |
| `innerRadius` | `number` | auto | Innenradius des Arc-Rings — wird aus `size` berechnet wenn nicht gesetzt |
| `ringThickness` | `number` | `20` | Dicke des Arc-Rings in px |
| `padAngle` | `number` | auto | Abstandswinkel zwischen Arc-Gruppen in Radiant |
| `ribbonPadAngle` | `number` | auto | Abstandswinkel innerhalb der Band-Pfade |
| `sortSubgroups` | `ChordSortBy` | `'descending'` | Sortierung der Untergruppen in jedem Arc |
| `sortChords` | `ChordSortBy` | `'descending'` | Sortierung der Bänder |
| `chartColors` | `string[]` | MUI-Palette | Eigene Farbpalette für Arc-Gruppen |
| `showGroupLabels` | `boolean` | `true` | Gruppenname-Labels außerhalb des Arc-Rings |
| `labelOffset` | `number` | `8` | Abstand zwischen Arc-Außenkante und Label-Text in px |
| `ribbonOpacity` | `number` | `0.75` | Opacity aller Bänder (0–1) |
| `ribbonBlendMode` | `CSSProperties['mixBlendMode']` | `'multiply'` | CSS mix-blend-mode für Bänder |
| `directed` | `boolean` | `true` | `true` = Pfeilkopf-Bänder; `false` = symmetrische Bänder |
| `valueDecimalCount` | `number` | `0` | Dezimalstellen in Tooltip-Werten |
| `valueDecimalSeparator` | `string` | `'.'` | Dezimaltrennzeichen |
| `valueThousandsSeparator` | `string` | `','` | Tausendertrennzeichen |
| `onGroupClick` | `(info, event) => void` | — | Klick auf einen Arc |
| `onChordClick` | `(info, event) => void` | — | Klick auf ein Band |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘ + Scroll` visueller Zoom — clippt am `size`-Rand |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen, reduziert Opacity |
| `translation` | `Partial<ChordChartTranslation>` | EN-Standard | Translation-Strings überschreiben |

---

## TypeScript-Typen

```ts
type ChordChartData = {
  source: string;
  target: string;
  value:  number;
};

type ChordGroupInfo = {
  name:     string;   // Gruppenname
  index:    number;   // Position im sortierten Namen-Array
  valueOut: number;   // Gesamt-Ausgangsfluss
  valueIn:  number;   // Gesamt-Eingangsfluss
};

type ChordInfo = {
  source: { name: string; index: number; value: number };
  target: { name: string; index: number; value: number };
};

type ChordSortBy = 'ascending' | 'descending' | 'none';

type ChordChartTranslation = {
  noData: string;
};
```

---

## Interaktionsmodell

| Geste | Aktion |
|---|---|
| **Hover** Arc-Gruppe | Hebt die Bänder der Gruppe hervor, dimmt alle anderen |
| **Mouse leave** | Stellt alle Band-Opacities wieder her |
| **Klick** Arc-Gruppe | Löst `onGroupClick` mit `ChordGroupInfo` aus |
| **Klick** Band | Löst `onChordClick` mit `ChordInfo` aus |

Der MUI-Tooltip (`followCursor`) erscheint beim Hover direkt am Mauszeiger:
- **Arc-Gruppe**: zeigt Name, ausgehende und eingehende Gesamtflüsse
- **Band**: zeigt Quelle → Ziel und Flusswerte

---

## Gerichtet vs. Ungerichtet

```tsx
// Gerichtet (Standard) — Pfeilkopf am Ziel-Ende
<ChordChart data={data} directed />

// Ungerichtet — symmetrische Bänder, keine Pfeilköpfe
<ChordChart data={data} directed={false} />
```

`directed={false}` verwenden wenn die Beziehung von Natur aus bidirektional ist (z. B. „Anzahl gemeinsamer Mitarbeiter") und die Richtung keine Rolle spielt.

---

## Farben

### Standard — MUI-Theme-Palette (automatisch)

Ohne `chartColors` werden Farben aus der aktiven MUI-Theme-Palette bezogen:

| Gruppe | MUI-Token | Standard (blaues Theme) |
|---|---|---|
| 1. | `theme.palette.primary.main` | `#1976d2` |
| 2. | `theme.palette.secondary.main` | `#9c27b0` |
| 3. | `theme.palette.error.main` | `#d32f2f` |
| 4. | `theme.palette.warning.main` | `#ed6c02` |
| 5. | `theme.palette.success.main` | `#2e7d32` |
| 6. | `theme.palette.info.main` | `#0288d1` |

Farben wiederholen sich zyklisch. **Dark Mode wird automatisch berücksichtigt.**

### Eigene Farbpalette

```tsx
<ChordChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457', '#37474F']}
/>
```

### MUI-Theme-Tokens zur Laufzeit

```tsx
import { useTheme } from '@mui/material';

function MyChart({ data }) {
  const theme = useTheme();
  return (
    <ChordChart
      data={data}
      chartColors={[
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
      ]}
    />
  );
}
```

### Farb-Override pro Gruppe — `groupColorConfigs`

```tsx
<ChordChart
  data={data}
  groupColorConfigs={{
    "Engineering": { fill: "#1565C0" },
    "Sales":       { fill: "#6A1B9A" },
    // Gruppen ohne Eintrag → chartColors oder MUI-Palette
  }}
/>
```

| Feld | Beschreibung |
|---|---|
| `fill` | Arc- und Band-Füllfarbe |
| `textColor` | Label-Textfarbe |
| `stroke` | Arc-Rahmenfarbe |

### Band-Opacity und Blend-Mode

`ribbonOpacity` (Standard `0.75`) und `ribbonBlendMode` (Standard `'multiply'`) steuern das visuelle Erscheinen der Bänder. Auf weißem Hintergrund erzeugt `'multiply'` natürliche Überlagerungen — auf dunklem Hintergrund empfiehlt sich `'screen'` oder `'normal'`.

```tsx
<ChordChart data={data} ribbonOpacity={0.6} ribbonBlendMode="screen" />
```

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Klick auf einen Gruppen-Bogen | `onGroupClick` |
> | Klick auf ein Ribbon (Chord) | `onChordClick` |

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onGroupClick` | `(info: ChordGroupInfo, event: React.MouseEvent) => void` | Klick auf einen Gruppen-Bogen | Ansicht nach geklickter Gruppe filtern, Gruppendetails anzeigen |
| `onChordClick` | `(info: ChordInfo, event: React.MouseEvent) => void` | Klick auf ein Ribbon zwischen zwei Gruppen | Flussdetails zwischen Quelle und Ziel anzeigen |

```tsx
<ChordChart
  data={data}
  onGroupClick={(info, event) => {
    console.log(info.name);     // "Frontend"
    console.log(info.valueOut); // Gesamt-Ausgang
    console.log(info.valueIn);  // Gesamt-Eingang
    console.log(info.index);    // Position im sortierten Namen-Array
  }}
  onChordClick={(info, event) => {
    console.log(info.source.name, '→', info.target.name); // "Frontend → Backend"
    console.log(info.source.value);                        // Flusswert
  }}
/>
```

---

## Deaktivierter Zustand

```tsx
<ChordChart data={data} disabled />
```

Alle Interaktionen (Hover-Highlight, Click-Callbacks) sind deaktiviert. Das Chart wird mit reduzierter Opacity (`0.5`) dargestellt.

---

## D3-Charts-Roadmap

| Komponente | Beschreibung | Status |
|---|---|---|
| `SunburstChart` | Konzentrische Ringe-Hierarchie-Chart | ✅ v2.2.0 |
| `ChordChart` | Fluss- und Beziehungsdiagramm | ✅ v2.3.0 |
| `TreemapChart` | Verschachtelte Rechtecke — proportionale Hierarchie | Geplant |
| `ZoomableCirclePackingChart` | Verschachtelte Kreise mit Zoom | Geplant |
| `RadialTreeChart` | Radialer Baum mit eigenen Knoten-Icons | Geplant |
