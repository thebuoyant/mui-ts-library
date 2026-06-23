# CirclePackingChart — Benutzerhandbuch

> [English Version →](CirclePackingChart.md)

**Hierarchische Daten als verschachtelte Kreise visualisieren — jede Kreisgröße proportional zum Wert, mit animiertem Doppelklick-Zoom.** `CirclePackingChart` für Budget-Aufschlüsselungen, Portfolio-Analysen, Dateisystemgrößen oder jede hierarchische Daten einsetzen, bei denen proportionale Schachtelung und Drill-Down-Navigation wichtig sind.

## Überblick

Der `CirclePackingChart` stellt hierarchische Daten mit dem Circle-Packing-Layout von [D3 v7](https://d3js.org) dar. Kreise sind verschachtelt und proportional zu ihren Werten dimensioniert. Ein Doppelklick zoomt mit einer D3-Interpolations-Animation ein — kein einfaches ViewBox-Scaling, sondern eine echte Wipe-Transition. Er ist die vierte Komponente der **D3-Charts-Familie**.

| Neu in v2.5.0 | |
|---|---|
| **CirclePackingChart** | D3 Circle Packing, animierter Zoom, Tiefen-Gradient oder Palette, MUI-Theme |

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
import { CirclePackingChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  CirclePackingData,
  CirclePackingNodeInfo,
  CirclePackingZoomInfo,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { CirclePackingChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { CirclePackingData } from '@thebuoyant-tsdev/mui-ts-library';

const data: CirclePackingData = {
  name: 'Unternehmen',
  children: [
    { name: 'Engineering', children: [
      { name: 'Frontend',  value: 480 },
      { name: 'Backend',   value: 620 },
      { name: 'DevOps',    value: 210 },
    ]},
    { name: 'Vertrieb',  value: 890 },
    { name: 'Produkt',   value: 640 },
  ],
};

function App() {
  return (
    <CirclePackingChart
      data={data}
      size={600}
      onCircleClick={(info) => console.log(info.name, info.value)}
      onZoomChange={(zoom) => console.log('Gezoomt zu:', zoom.currentName)}
    />
  );
}
```

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `CirclePackingData` | — | **Pflichtfeld.** Wurzelknoten der Hierarchie |
| `size` | `number` | `600` | Breite und Höhe des SVG in px (immer quadratisch) |
| `padding` | `number` | `3` | Abstand zwischen verschachtelten Kreisen in px |
| `sortBy` | `CirclePackingSortBy` | `'value'` | Sortierung nach Wert oder alphabetisch |
| `showLabels` | `boolean` | `true` | Zentrierte Labels; blenden bei Zoom ein/aus |
| `labelFontSize` | `number` | `11` | Label-Schriftgröße in px |
| `labelColor` | `string` | Theme-Text | Label-Textfarbe |
| `chartColors` | `string[]` | — | Feste Tiefenpalette — überschreibt Gradient |
| `depthColorStart` | `string` | Theme primary | Gradient-Startfarbe |
| `depthColorEnd` | `string` | Theme secondary | Gradient-Endfarbe |
| `background` | `string` | Theme-Hintergrund | SVG-Hintergrundfüllung |
| `duration` | `number` | `750` | Zoom-Animationsdauer in ms |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘ + Scroll` visueller Zoom — clippt am `size`-Rand |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen |
| `onCircleClick` | `(info, event) => void` | — | Einfacher Klick auf Kreis |
| `onZoomChange` | `(zoom) => void` | — | Bei jedem Zoom-Übergang |
| `translation` | `Partial<CirclePackingTranslation>` | EN-Standard | Strings überschreiben |

---

## Interaktionsmodell

| Geste | Aktion |
|---|---|
| **Doppelklick** auf Kreis | Animierter Zoom in diesen Kreis (D3 `interpolateZoom`-Transition) |
| **Doppelklick** auf Hintergrund | Animierter Zoom eine Ebene zurück |
| **Alt+Doppelklick** | Zeitlupe (10× Dauer) — ideal für Präsentationen |
| **Einfacher Klick** auf Kreis | Löst `onCircleClick` sofort aus |

Der Zoom nutzt `d3.interpolateZoom` — eine echte Wipe-Animation, die alle Kreise neu positioniert und skaliert. Labels der direkten Kinder des neuen Fokus blenden ein; alle anderen blenden aus.

Ein **Breadcrumb-Hinweis** erscheint unten rechts wenn hereingezoomt wurde.

---

## Farben & Visuelle Anpassung

### Standard — Tiefen-Gradient (automatisch)

Ohne `chartColors` wird ein HCL-interpolierter Gradient aus MUI-Theme-Farben verwendet:

| Einstellung | MUI-Token |
|---|---|
| `depthColorStart` | `theme.palette.primary.light` |
| `depthColorEnd` | `theme.palette.secondary.dark` |

**Dark Mode wird automatisch berücksichtigt.**

### Eigene Farbpalette

```tsx
<CirclePackingChart
  data={data}
  chartColors={['#1565C0', '#1976D2', '#42A5F5', '#90CAF9', '#E3F2FD']}
  background="#F5F5F5"
/>
```

### Eigener Gradient

```tsx
<CirclePackingChart
  data={data}
  depthColorStart="hsl(200, 80%, 85%)"
  depthColorEnd="hsl(260, 60%, 35%)"
/>
```

### MUI-Theme-Tokens zur Laufzeit

```tsx
import { useTheme } from '@mui/material';

function MyChart({ data }) {
  const theme = useTheme();
  return (
    <CirclePackingChart
      data={data}
      depthColorStart={theme.palette.primary.light}
      depthColorEnd={theme.palette.secondary.dark}
      background={theme.palette.background.paper}
    />
  );
}
```

---

## Farb-Override pro Knoten — `colorConfig`

Jeder Knoten kann direkt in den Daten seine eigene Farbe definieren:

```tsx
const data: CirclePackingData = {
  id: "company", name: "Unternehmen",
  children: [
    {
      id: "engineering", name: "Engineering",
      colorConfig: { fill: "#1565C0" },
      children: [
        { id: "fe", name: "Frontend", value: 480, colorConfig: { fill: "#1976D2" } },
      ],
    },
    { id: "ops", name: "Operations" }, // kein colorConfig → Standard-Palette
  ],
};
```

Konsistent mit `SunburstChart`, `RadialTreeChart` und `ChordChart` — alle D3-Charts unterstützen Per-Knoten-Farb-Overrides.

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Normaler Klick auf einen Kreis | `onCircleClick` |
> | Strg / Cmd ⌘+Klick zum Zoom-in | `onZoomChange` |
> | Strg / Cmd ⌘+Doppelklick zum Zoom-out | `onZoomChange` |
> | Escape-Taste (auf Root zurücksetzen) | `onZoomChange` |

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onCircleClick` | `(info: CirclePackingNodeInfo, event: React.MouseEvent) => void` | Normaler Klick auf einen Kreis (ohne Strg/Cmd) | Knoten-Details anzeigen, Dashboard filtern |
| `onZoomChange` | `(zoom: CirclePackingZoomInfo) => void` | Fokus wechselt: Strg/Cmd+Klick Zoom-in, Strg/Cmd+Doppelklick Zoom-out, Escape-Reset | Drill-Down-State verfolgen, Breadcrumb-Navigation |

---

## D3-Charts-Roadmap

| Komponente | Beschreibung | Status |
|---|---|---|
| `SunburstChart` | Konzentrische Ringe-Hierarchie | ✅ v2.2.0 |
| `ChordChart` | Fluss- und Beziehungsdiagramm | ✅ v2.3.0 |
| `RadialTreeChart` | Radialer Baum mit Icons und Popover | ✅ v2.4.0 |
| `CirclePackingChart` | Verschachtelte Kreise mit animiertem Zoom | ✅ v2.5.0 |
| `TreemapChart` | Verschachtelte Rechtecke | Geplant |
