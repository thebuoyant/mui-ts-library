# RadialTreeChart — Benutzerhandbuch

> [English Version →](RadialTreeChart.md)

**Jede Hierarchie als radialen Baum visualisieren — Knoten auf konzentrischen Ringen, verbunden durch geschwungene Links.** `RadialTreeChart` für Org-Charts, Skill-Taxonomien, Datei-Bäume, Abhängigkeitsgraphen oder jede Hierarchie einsetzen, bei der Struktur und Tiefenebene gleichzeitig sichtbar sein sollen.

## Überblick

Der `RadialTreeChart` stellt hierarchische Daten als kreisförmigen radialen Baum auf Basis von [D3 v7](https://d3js.org) dar. Die Wurzel sitzt im Zentrum, Kindknoten strahlen nach außen in Ringen. Jeder Knoten kann ein Icon haben, und ein Klick kann ein eingebautes MUI-Popover mit Knotendetails öffnen. Er ist die dritte Komponente der **D3-Charts-Familie**.

**Typische Einsatzgebiete:**

- Organigramme und Berichts-Hierarchien
- Skill- oder Kompetenz-Taxonomien
- Modul- oder Paket-Abhängigkeitsbäume
- Wissensgraphen und Themenlandkarten

| ✨ Neu in v2.4.0 | |
|---|---|
| **RadialTreeChart** | D3 radialer Baum, MUI-Icons, eingebautes Knoten-Popover |
| **`zoomable`** | `Ctrl / Cmd ⌘ + Scroll` visueller Zoom — Inhalt am `size`-Rand abschneiden |
| **`drillable`** | `Ctrl / Cmd ⌘ + Click` Drill-Down in Teilbäume, `Ctrl / Cmd ⌘ + DblClick` zurück |

> **macOS-Tastaturkürzel:** `Cmd ⌘` statt `Ctrl` verwenden — z. B. `Cmd ⌘+Click`, `Cmd ⌘+Scroll`.  
> Alle Interaktionen prüfen `ctrlKey || metaKey`, funktionieren also auf beiden Plattformen.

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@mui/icons-material` | 9 |
| `d3` | 7.x |

---

## Import

```tsx
import { RadialTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RadialTreeChartData,
  RadialTreeChartProps,
  RadialTreeNodeInfo,
  RadialTreeNodeIconSpec,
  RadialTreeSortBy,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { RadialTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { RadialTreeChartData } from '@thebuoyant-tsdev/mui-ts-library';

const data: RadialTreeChartData = {
  id: 'ceo', name: 'CEO', subname: 'Führung',
  children: [
    {
      id: 'cto', name: 'CTO', subname: 'Technologie',
      children: [
        { id: 'fe', name: 'Frontend Lead', specialValueA: 'L2', specialValueB: '8 Berichte' },
        { id: 'be', name: 'Backend Lead',  specialValueA: 'L2', specialValueB: '6 Berichte' },
      ],
    },
    { id: 'cpo', name: 'CPO', subname: 'Produkt' },
  ],
};

function App() {
  return (
    <RadialTreeChart
      data={data}
      size={600}
      showNodePopover
      onNodeClick={(info) => console.log(info.name, info.depth)}
    />
  );
}
```

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `RadialTreeChartData` | — | **Pflichtfeld.** Wurzelknoten der Hierarchie |
| `size` | `number` | `600` | Breite und Höhe des SVG in Pixeln |
| `autoFit` | `boolean` | `true` | viewBox automatisch an den Inhalt anpassen |
| `sortBy` | `RadialTreeSortBy` | `'name'` | Kinder alphabetisch oder nach Wert sortieren |
| `showLabels` | `boolean` | `true` | Knoten-Name-Labels anzeigen |
| `chartColors` | `string[]` | MUI-Palette | Farben pro Tiefenebene |
| `linkStrokeOpacity` | `number` | `0.4` | Link-Linien-Opacity |
| `linkStrokeWidth` | `number` | `1.5` | Link-Linienbreite in px |
| `nodeRadius` | `number` | `4` | Knoten-Kreisradius in px (ohne Icon) |
| `separationSibling` | `number` | `1` | Abstandsfaktor zwischen Geschwisterknoten |
| `separationCousin` | `number` | `2` | Abstandsfaktor zwischen Cousin-Knoten |
| `showIcons` | `boolean` | `true` | Icons auf Knoten anzeigen |
| `iconSize` | `number` | `18` | Icon-Größe in px |
| `nodeIconsByDepth` | `Record<number, RadialTreeNodeIconSpec>` | — | Icon-Overrides pro Tiefenebene |
| `renderNodeIcon` | `(info) => ReactElement \| null` | — | Vollständig custom Icon-Renderer pro Knoten |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘ + Scroll` visueller Zoom — clippt am `size`-Rand |
| `drillable` | `boolean` | `false` | `Ctrl / Cmd ⌘ + Click` Drill-Down in Teilbäume |
| `onFocusChange` | `(info \| null) => void` | — | Wird bei Drill-Down-Wechsel ausgelöst |
| `showNodePopover` | `boolean` | `false` | Eingebautes MUI-Popover bei Knotenklick öffnen |
| `renderNodePopoverContent` | `(info) => ReactNode` | — | Custom Popover-Inhalt (ersetzt Standard) |
| `onNodeClick` | `(info, event) => void` | — | Wird bei normalem Klick ausgelöst |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen, reduziert Opacity |
| `translation` | `Partial<RadialTreeChartTranslation>` | EN-Standard | Translation-Strings überschreiben |

---

## TypeScript-Typen

```ts
type RadialTreeChartData = {
  id:            string;
  name:          string;
  subname?:      string;        // Untertitel im eingebauten Popover
  value?:        number;
  specialValueA?: string | number; // eigenes Feld A
  specialValueB?: string | number; // eigenes Feld B
  children?:     RadialTreeChartData[];
};

type RadialTreeNodeInfo = {
  id:            string;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  path:          string[];      // Breadcrumb von Root
  childrenCount: number;
  data:          RadialTreeChartData;
};

type RadialTreeNodeIconSpec =
  | React.ElementType
  | { icon: React.ElementType; color?: string };

type RadialTreeSortBy = 'name' | 'value';

type RadialTreeChartTranslation = {
  noData:         string;
  specialValueA?: string; // Bezeichnung für specialValueA im Popover
  specialValueB?: string; // Bezeichnung für specialValueB im Popover
};
```

---

## Interaktionsmodell

> **macOS:** Bitte `Cmd ⌘` statt `Ctrl` verwenden.

| Geste | Aktion | Benötigt |
|---|---|---|
| **Hover** über Knoten | MUI-Tooltip am Mauszeiger — zeigt Name, Subname, Datenwerte | immer |
| **Klick** auf Knoten | Löst `onNodeClick` aus + öffnet Popover wenn `showNodePopover` | immer |
| **Ctrl / Cmd ⌘ + Klick** auf Branch-Knoten | Drill-Down in Teilbaum (250 ms Timer für DblClick-Unterscheidung) | `drillable` |
| **Ctrl / Cmd ⌘ + Doppelklick** | Zoom out eine Ebene | `drillable` |
| **Ctrl / Cmd ⌘ + Scroll hoch** | Visueller Zoom in (clippt am `size`-Rand) | `zoomable` |
| **Ctrl / Cmd ⌘ + Scroll runter** | Visueller Zoom out | `zoomable` |
| **Escape** | Drill-Down + visuellen Zoom zurücksetzen | `drillable` / `zoomable` |

---

## Eingebautes Knoten-Popover

```tsx
<RadialTreeChart
  data={data}
  showNodePopover
  translation={{ specialValueA: 'Level', specialValueB: 'Team-Größe' }}
/>
```

Das Standard-Popover zeigt Avatar mit Namenskürzel, Namen, Subname und beide Sonderwerte mit konfigurierbaren Bezeichnungen. Für vollständig eigenen Inhalt:

```tsx
<RadialTreeChart
  data={data}
  showNodePopover
  renderNodePopoverContent={(info) => (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2">{info.name}</Typography>
      <Typography variant="caption">{info.path.join(' › ')}</Typography>
    </Box>
  )}
/>
```

---

## D3-Charts-Roadmap

| Komponente | Beschreibung | Status |
|---|---|---|
| `SunburstChart` | Konzentrische Ringe-Hierarchie-Chart | ✅ v2.2.0 |
| `ChordChart` | Fluss- und Beziehungsdiagramm | ✅ v2.3.0 |
| `RadialTreeChart` | Radialer Baum mit Icons und Popover | ✅ v2.4.0 |
| `TreemapChart` | Verschachtelte Rechtecke | Geplant |
| `ZoomableCirclePackingChart` | Verschachtelte Kreise mit Zoom | Geplant |
