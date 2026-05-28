# SunburstChart — Benutzerhandbuch

> [English Version →](SunburstChart.md)

## Überblick

Der `SunburstChart` visualisiert **hierarchische Daten als konzentrische Ringe** — der Wurzelknoten befindet sich im Zentrum, jede Tiefenebene bildet einen Ring darum. Segmentgrößen sind proportional zu ihren Werten. Er ist die erste Komponente der **D3-Charts-Familie** dieser Bibliothek.

**Typische Einsatzgebiete:**

- Budget- oder Kostenaufschlüsselung nach Abteilung und Kategorie
- Organisationshierarchien
- Dateisystemgrößen
- Produkttaxonomie mit Drill-down
- Beliebige hierarchische und proportionale Daten

| ✨ Neu in v2.2.0 | |
|---|---|
| **SunburstChart** | Erstes D3-Chart — Ctrl+Click-Zoom, Donut-Modus, MUI-Theme-Palette |

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
| `onZoomChange` | `(zoom: SunburstZoomInfo) => void` | — | Wird bei Zoom-Wechsel ausgelöst (Ctrl+Click, Ctrl+DblClick, Escape) |
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
  noData:                string;
  ctrlClickToZoomIn:     string;
  ctrlDblClickToZoomOut: string;
  escToResetZoom:        string;
};
```

---

## Interaktionsmodell

| Geste | Aktion |
|---|---|
| **Klick** | Löst `onSegmentClick` sofort aus — kein Delay |
| **Ctrl+Klick** auf ein Elternsegment | Zoom in (Drill-down in dieses Segment) |
| **Ctrl+Doppelklick** auf ein Segment | Zoom out eine Ebene |
| **Ctrl+Klick** auf Center-Label | Zoom out eine Ebene |
| **Escape** | Zoom zur Root zurücksetzen |

> **Warum Ctrl+Click statt Doppelklick?**  
> Dieses Modell eliminiert den klassischen 200ms-Delay-Hack. `onSegmentClick` feuert sofort bei jedem Klick — keine spürbare Verzögerung. Zoom ist eine bewusste, explizite Aktion (Modifier-Taste erforderlich) und kann nie versehentlich passieren.

Das Center-Label zeigt immer den **aktuellen Fokus-Knotennamen** — beim Zoom-Zustand funktioniert es als Breadcrumb. Per Hover werden die verfügbaren Shortcuts als Tooltip angezeigt.

---

## Donut-Modus

`innerRadius > 0` erzeugt ein Loch im Zentrum:

```tsx
<SunburstChart data={data} innerRadius={100} />
```

Der Lochbereich im Zentrum ist klickbar — `Ctrl+Click` zoomt heraus, normaler Klick löst `onSegmentClick` für den Elternknoten aus.

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

### Standard — MUI-Theme-Palette

Ohne `chartColors` verwendet das Chart die aktive MUI-Theme-Palette in dieser Reihenfolge:
`primary` → `secondary` → `error` → `warning` → `success` → `info`

Farben passen sich automatisch an, wenn der User zwischen Light/Dark-Theme oder einem Custom-Theme wechselt.

### Eigene Palette

```tsx
<SunburstChart
  data={data}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457']}
/>
```

Farben werden Top-Level-Segmenten zugewiesen und wiederholen sich zyklisch wenn mehr Segmente als Farben vorhanden sind.

---

## Segment-Klick-Callback

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
  translation={{
    ctrlClickToZoomIn:     'Ctrl+Klick zum Hineinzoomen',
    ctrlDblClickToZoomOut: 'Ctrl+Doppelklick zum Herauszoomen',
    escToResetZoom:        'Esc zum Zurücksetzen',
    noData:                'Keine Daten',
  }}
/>
```

Die Translation-Strings erscheinen im **Custom MUI-Tooltip**, der beim Hover sofort erscheint (kein Browser-Delay). Der Tooltip zeigt Knotenname, formatierten Wert, Breadcrumb-Pfad und Zoom-Shortcut-Hinweise. Alle Keys sind optional — nicht gesetzte Keys verwenden die englischen Standardwerte.

---

## D3-Charts-Roadmap

Der `SunburstChart` ist die erste Komponente der **D3-Charts-Familie**. Geplante Folgekomponenten:

| Komponente | Beschreibung | Status |
|---|---|---|
| `SunburstChart` | Konzentrische Ringe-Hierarchie-Chart | ✅ v2.2.0 |
| `TreemapChart` | Verschachtelte Rechtecke — proportionale Hierarchie | Geplant |
| `ZoomableCirclePackingChart` | Verschachtelte Kreise mit Zoom | Geplant |
| `ChordChart` | Fluss- und Beziehungsdiagramm zwischen Gruppen | Geplant |
| `RadialTreeChart` | Radialer Baum mit eigenen Knoten-Icons | Geplant |

Alle D3-Charts folgen denselben Konventionen: `chartColors`, `translation`, `disabled`, `onXxxClick`, MUI-Theme-Integration und Dark-Mode-Unterstützung.
