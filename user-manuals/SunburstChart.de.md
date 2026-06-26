# SunburstChart — Benutzerhandbuch

> [English Version →](SunburstChart.md)

**Jede Hierarchie, bei der Größenverhältnisse wichtig sind — Budgets, Org-Strukturen, Dateisysteme — als konzentrische Ringe mit Drill-down visualisieren.** `SunburstChart` einsetzen, wenn gleichzeitig die hierarchische Struktur und das proportionale Gewicht jedes Knotens sichtbar sein soll.

## Überblick

Der `SunburstChart` visualisiert **hierarchische Daten als konzentrische Ringe** — der Wurzelknoten befindet sich im Zentrum, jede Tiefenebene bildet einen Ring darum. Segmentgrößen sind proportional zu ihren Werten. Er ist die erste Komponente der **D3-Charts-Familie** dieser Bibliothek.

**Typische Einsatzgebiete:**

- Budget- oder Kostenaufschlüsselung nach Abteilung und Kategorie
- Organisationshierarchien
- Dateisystemgrößen
- Produkttaxonomie mit Drill-down
- Beliebige hierarchische und proportionale Daten

| Neu in v2.2.0 | |
|---|---|
| **SunburstChart** | Erstes D3-Chart — Ctrl / Cmd ⌘+Click Drill-Down, Donut-Modus, MUI-Theme-Palette |
| **`zoomable`** *(v2.4.0)* | `Ctrl / Cmd ⌘ + Scroll` visueller Zoom — Inhalt wird am `size`-Rand abgeschnitten |
| **`duration`** *(v3.10.0)* | Rein-/Rauszoomen animiert jetzt sanft zwischen Fokus-Ebenen — [→ Interaktionsmodell](#interaktionsmodell) |

> **macOS-Tastaturkürzel:** `Cmd ⌘` statt `Ctrl` verwenden — z. B. `Cmd ⌘+Click`, `Cmd ⌘+Scroll`.  
> Alle Interaktionen prüfen `ctrlKey || metaKey`, funktionieren also auf beiden Plattformen.

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `d3` | 7.x |

> `d3` ist eine Peer-Dependency — zusammen mit der Library installieren:
> ```bash
> npm install d3@^7
> ```

---

## Import

```tsx
import { SunburstChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  SunburstChartData,
  SunburstChartProps,
  SunburstSegmentInfo,
  SunburstChartTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { SunburstChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { SunburstChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: SunburstChartData = {
  id: 'unternehmen', name: 'Unternehmen',
  children: [
    {
      id: 'engineering', name: 'Engineering',
      children: [
        { id: 'frontend', name: 'Frontend', value: 480 },
        { id: 'backend',  name: 'Backend',  value: 620 },
        { id: 'devops',   name: 'DevOps',   value: 210 },
      ],
    },
    {
      id: 'vertrieb', name: 'Vertrieb',
      children: [
        { id: 'emea',     name: 'EMEA',     value: 540 },
        { id: 'americas', name: 'Americas', value: 490 },
      ],
    },
  ],
};

function App() {
  return (
    <SunburstChart
      data={data}
      size={500}
      onSegmentClick={(info) => console.log(info.path, info.value)}
    />
  );
}
```

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `SunburstChartData` | — | **Pflichtfeld.** Wurzelknoten der Hierarchie |
| `size` | `number` | `500` | Breite und Höhe des SVG in Pixeln |
| `showSegmentLabels` | `boolean` | `true` | Arc-ausgerichtete Textlabels; werden automatisch mit `…` abgekürzt wenn der Arc zu schmal ist |
| `innerRadius` | `number` | `0` | `0` = solider Sunburst; `> 0` = Donut-Loch in px |
| `sortBy` | `'value' \| 'name'` | `'value'` | Nach Gesamtwert oder alphabetisch sortieren |
| `chartColors` | `string[]` | MUI-Palette | Eigene Farbpalette für Top-Level-Segmente |
| `showRootLabel` | `boolean` | `true` | Aktuellen Fokus-Knotennamen im Zentrum anzeigen |
| `onSegmentClick` | `(info, event) => void` | — | Wird bei jedem normalen Klick ausgelöst |
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | — | Wird bei Drill-Down-Wechsel ausgelöst (Ctrl / Cmd ⌘+Click, Ctrl / Cmd ⌘+DblClick, Escape) |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘ + Scroll` visueller Zoom — clippt am `size`-Rand |
| `duration` | `number` | `750` | Dauer des Drill-in/out-Übergangs in ms. `0` deaktiviert die Animation (sofortiger Sprung). |
| `valueDecimalCount` | `number` | `0` | Dezimalstellen in Tooltip-Werten |
| `valueDecimalSeparator` | `string` | `'.'` | Dezimaltrennzeichen |
| `valueThousandsSeparator` | `string` | `','` | Tausendertrennzeichen |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen, reduziert Opacity |
| `translation` | `Partial<SunburstChartTranslation>` | EN-Standard | Tooltip-Hinweistexte überschreiben |

---

## TypeScript-Typen

```ts
type SunburstChartData = {
  id:        string;
  name:      string;
  value?:    number;      // Blattknoten müssen einen Wert haben
  children?: SunburstChartData[];
};

type SunburstSegmentInfo = {
  id:            string;        // direkt — entspricht data.id
  name:          string;
  value:         number | null; // D3-Aggregat: Summe aller Blattknoten-Werte
  percentage:    number;        // Anteil am Root-Gesamtwert in % (2 Dezimalstellen)
  depth:         number;
  path:          string[];      // Breadcrumb von Root — Array von Namen
  pathIds:       string[];      // Breadcrumb von Root — Array von IDs (Backend-Verlinkung)
  childrenCount: number;
  data:          SunburstChartData; // originaler Datenknoten
};

type SunburstZoomInfo = {
  focusNode: SunburstSegmentInfo; // Knoten, der jetzt im Zentrum steht
  isRoot:    boolean;             // true wenn Zoom zur Root zurückgesetzt wurde
};

type SunburstChartTranslation = {
  /** Angezeigt wenn die Daten keinen Wert oder keine Kinder haben */
  noData: string;
};
```

---

## Interaktionsmodell

| Geste | Aktion |
|---|---|
| **Klick** | Löst `onSegmentClick` sofort aus — kein Delay |
| **Ctrl+Klick** / **Cmd ⌘+Klick** auf Elternsegment | Drill-Down — dieses Segment wird zum neuen Zentrum |
| **Ctrl+Doppelklick** / **Cmd ⌘+Doppelklick** | Zoom out eine Ebene |
| **Ctrl+Klick** / **Cmd ⌘+Klick** auf Center-Label | Zoom out eine Ebene |
| **Ctrl+Scroll** / **Cmd ⌘+Scroll** *(benötigt `zoomable`)* | Visueller Zoom — clippt am `size`-Rand |
| **Escape** | Alles zurücksetzen |

> **macOS:** Bitte `Cmd ⌘` statt `Ctrl` verwenden.

> **Warum Modifier+Click statt Doppelklick?**  
> Eliminiert den klassischen 200ms-Delay-Hack. `onSegmentClick` feuert sofort bei jedem Klick. Zoom ist eine bewusste, explizite Aktion die nie versehentlich passiert.

Das Center-Label zeigt immer den **aktuellen Fokus-Knotennamen** — beim Zoom-Zustand funktioniert es als Breadcrumb.

**Animierte Übergänge:** Jeder Drill-in, Drill-out und Escape-Reset interpoliert sanft zwischen Fokus-Ebenen über `duration` ms (Standard `750`) statt abrupt zu wechseln. `onZoomChange` feuert weiterhin sofort bei Auslösung der Interaktion — nur die visuelle Darstellung animiert, Konsumenten, die auf den Callback reagieren, müssen also nicht auf das Ende des Übergangs warten. `duration={0}` deaktiviert die Animation und springt direkt zum neuen Fokus.

---

## Donut-Modus

`innerRadius > 0` erzeugt ein Loch im Zentrum:

```tsx
<SunburstChart data={data} innerRadius={100} />
```

Der Lochbereich im Zentrum ist klickbar — `Ctrl / Cmd ⌘+Click` zoomt heraus, normaler Klick löst `onSegmentClick` für den Elternknoten aus.

---

## Sortierung

```tsx
// Größte Segmente zuerst (Standard)
<SunburstChart data={data} sortBy="value" />

// Alphabetische Reihenfolge auf jeder Ebene
<SunburstChart data={data} sortBy="name" />
```

---

## Farben

### Standard — MUI-Theme-Palette (automatisch)

Ohne `chartColors` werden Farben aus der aktiven MUI-Theme-Palette bezogen:

| Tiefe-1-Segment | MUI-Token | Standard (blaues Theme) |
|---|---|---|
| 1. | `theme.palette.primary.main` | `#1976d2` |
| 2. | `theme.palette.secondary.main` | `#9c27b0` |
| 3. | `theme.palette.error.main` | `#d32f2f` |
| 4. | `theme.palette.warning.main` | `#ed6c02` |
| 5. | `theme.palette.success.main` | `#2e7d32` |
| 6. | `theme.palette.info.main` | `#0288d1` |

Farben wiederholen sich zyklisch bei mehr Segmenten. **Dark Mode wird automatisch berücksichtigt.**

### Eigene Farbpalette

```tsx
<SunburstChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457']}
/>
```

### MUI-Theme-Tokens zur Laufzeit

```tsx
import { useTheme } from '@mui/material';

function MyChart({ data }) {
  const theme = useTheme();
  return (
    <SunburstChart
      data={data}
      chartColors={[
        theme.palette.primary.dark,
        theme.palette.secondary.dark,
        theme.palette.success.main,
        theme.palette.warning.main,
      ]}
    />
  );
}
```

### Farb-Zuweisung

Farben werden den **Top-Level-Segmenten** (Tiefe 1) zugewiesen. Kind-Segmente erhalten automatisch eine transparentere Variante der Elternfarbe (fill-opacity 0.5 vs 0.75).

### Farb-Override pro Knoten — `colorConfig`

Jeder Knoten kann eigene Farben direkt in den Daten definieren und überschreibt damit die Chart-Palette:

```tsx
const data: SunburstChartData = {
  id: "company", name: "Unternehmen",
  children: [
    {
      id: "engineering", name: "Engineering",
      colorConfig: { fill: "#1565C0" },   // Brand-Blau
      children: [
        { id: "fe", name: "Frontend", value: 480, colorConfig: { fill: "#1976D2" } },
      ],
    },
    {
      id: "sales", name: "Vertrieb",
      // kein colorConfig → Chart-Palette greift
    },
  ],
};
```

| Feld | Beschreibung |
|---|---|
| `fill` | Segment-Füllfarbe |
| `textColor` | Label-Textfarbe (zukünftige Verwendung) |
| `stroke` | Segment-Rahmenfarbe |

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Klick auf ein Segment | `onSegmentClick` |
> | Strg / Cmd ⌘+Klick zum Zoom in ein Segment | `onZoomChange` |
> | Klick auf Mittelpunkt-Label / Donut-Loch zum Herauszoomen | `onZoomChange` |
> | Escape-Taste (Zoom zurücksetzen) | `onZoomChange` |

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onSegmentClick` | `(info: SunburstSegmentInfo, event: React.MouseEvent) => void` | Normaler Klick auf einen Segment-Bogen oder das Mittelpunkt-Label | Detail-Panel anzeigen, zu einer gefilterten Ansicht navigieren |
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | Fokus wechselt: Strg/Cmd+Klick Zoom-in, Mittelpunkt-Klick Zoom-out oder Escape-Reset | Drill-Down-State verfolgen, Breadcrumb-Navigation |

```tsx
<SunburstChart
  data={data}
  onSegmentClick={(info, event) => {
    console.log(info.id);            // "frontend"
    console.log(info.name);          // "Frontend"
    console.log(info.value);         // 480  (D3-Aggregat — Summe der Nachfolger)
    console.log(info.percentage);    // 10.2 (% vom Root-Gesamtwert, 2 Dezimalstellen)
    console.log(info.depth);         // 2
    console.log(info.path);          // ["Unternehmen", "Engineering", "Frontend"]
    console.log(info.pathIds);       // ["unternehmen", "engineering", "frontend"]
    console.log(info.childrenCount); // 0 (Blattknoten)
    console.log(info.data);          // originaler SunburstChartData-Knoten
  }}
  onZoomChange={(zoom) => {
    console.log(zoom.focusNode.name); // "Engineering" — aktuelles Zentrum
    console.log(zoom.isRoot);         // false — nicht auf Root-Ebene
  }}
/>
```

---

## Deaktivierter Zustand

```tsx
<SunburstChart data={data} disabled />
```

Alle Interaktionen sind deaktiviert. Das Chart wird mit reduzierter Opacity (`0.5`) dargestellt. Nützlich für Read-only-Dashboards oder Ladezustände.

---

## i18n — Übersetzungen

```tsx
<SunburstChart
  data={data}
  translation={{ noData: 'Keine Daten verfügbar' }}
/>
```

Aktuell ist `noData` der einzige Translation-Key (wird angezeigt wenn die Daten keinen Wert oder keine Kinder haben). Alle Keys sind optional — nicht gesetzte Keys verwenden die englischen Standardwerte.

---

## D3-Charts-Familie

Der `SunburstChart` war die erste Komponente der **D3-Charts-Familie** — alle 5 sind inzwischen erschienen:

| Komponente | Beschreibung | Status |
|---|---|---|
| `SunburstChart` | Konzentrische Ringe-Hierarchie-Chart | ✅ v2.2.0 |
| `ChordChart` | Fluss- und Beziehungsdiagramm zwischen Gruppen | ✅ v2.3.0 |
| `RadialTreeChart` | Radialer Baum mit eigenen Knoten-Icons | ✅ v2.4.0 |
| `CirclePackingChart` | Verschachtelte Kreise mit animiertem Zoom | ✅ v2.5.0 |
| `HorizontalTreeChart` | Entscheidungsbäume in 4 Ausrichtungen | ✅ v2.6.0 |

Alle D3-Charts folgen denselben Konventionen: `chartColors`, `translation`, `disabled`, `onXxxClick`, MUI-Theme-Integration und Dark-Mode-Unterstützung. Offene Feature-Ideen pro Chart: [`component-features-nice-to-have.md`](../component-features-nice-to-have.md).
