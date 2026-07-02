# HorizontalTreeChart — Benutzerhandbuch

> [English Version →](HorizontalTreeChart.md)

**Jede Hierarchie als Baum visualisieren — in vier Orientierungen.** `HorizontalTreeChart` für Org-Charts, Architekturdiagramme, Abhängigkeitsbäume, Dateisystem-Hierarchien oder jede Datenstruktur einsetzen, bei der die Eltern→Kind-Beziehung in einer klaren linearen Richtung lesbar sein soll.

## Überblick

### Was macht diese Komponente?

Der Nutzer sieht ein Baumdiagramm: ein Wurzelknoten auf einer Seite, mit Ästen die sich nach außen verzweigen — jeder Knoten als farbiger Kreis mit einem Label. Der Baum kann links→rechts, rechts→links, oben→unten oder unten→oben wachsen.

Zwei optionale Interaktionsmodi:
- **Drill-Down** (`drillable`): `Ctrl / Cmd ⌘+Klick` auf einen Ast-Knoten zoomt hinein, sodass dieser Knoten zur neuen Wurzel wird — der Rest des Baums wird ausgeblendet. `Ctrl / Cmd ⌘+Doppelklick` zoomt wieder heraus. Nützlich bei großen Bäumen, um einen Ast nach dem anderen zu erkunden.
- **Visueller Zoom** (`zoomable`): `Ctrl / Cmd ⌘+Scroll` skaliert das gesamte SVG — wie das Zoomen einer Karte.

`Escape` setzt beides (Drill-Down und Zoom) gleichzeitig zurück.

**Typische Anwendungsfälle:**

- Org-Charts (Unternehmensstruktur, Team-Hierarchien)
- Software-Architekturdiagramme (Services, Abhängigkeiten)
- Dateisystem- oder Ordnervisualisierungen
- Jede Hierarchie, bei der die Leserichtung eine Rolle spielt (links nach rechts für "Elternteil verursacht Kind", oben nach unten für "Vorgesetzter über Mitarbeiter")

Sie ist die fünfte Komponente der **D3-Charts-Familie** und teilt alle Konventionen (`colorConfig`, `chartColors`, `zoomable`, `drillable`, MUI Tooltip) mit ihren Geschwistern.

| Neu in v2.6.0 | |
|---|---|
| **HorizontalTreeChart** | 4 Orientierungen, D3-Tree-Layout, Drill-Down, Zoom, MUI-Theme |
| **`duration`** *(v3.11.0)* | Drill in/out crossfaded jetzt statt abrupt zu wechseln — [→ Interaktionsmodell](#interaktionsmodell) |

> **macOS:** `Cmd ⌘` statt `Ctrl` für alle Tastaturkürzel verwenden.

---

## Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`, `@mui/icons-material`) | 9 |
| `d3` | 7.x |

---

## Import

```tsx
import { HorizontalTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  HorizontalTreeData,
  HorizontalTreeNodeInfo,
  HorizontalTreeOrientation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { HorizontalTreeChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { HorizontalTreeData } from '@thebuoyant-tsdev/mui-ts-library';

// Deine Daten sind ein Baum: jeder Knoten kann Kinder haben, die wiederum Kinder haben können.
// "name" wird als Label angezeigt, "id" wird intern verwendet (optional, aber empfohlen).
const data: HorizontalTreeData = {
  id: 'platform', name: 'Platform',          // Wurzelknoten
  children: [
    {
      id: 'fe', name: 'Frontend', subname: 'React',  // subname erscheint kleiner unter dem Label
      children: [
        { id: 'web',    name: 'Web App',  specialValueA: 'Next.js 15' },
        { id: 'mobile', name: 'Mobile',   specialValueA: 'React Native' },
      ],
    },
    { id: 'be', name: 'Backend', subname: 'Node.js' }, // Blattknoten (keine Kinder)
  ],
};

<HorizontalTreeChart
  data={data}
  orientation="LR"  // links → rechts: Wurzel links, Blätter rechts
  drillable         // Ctrl/Cmd+Klick auf einen Ast zoomt in den Teilbaum hinein
  zoomable          // Ctrl/Cmd+Scroll skaliert den gesamten Chart
  onNodeClick={(info) => console.log(info.name, info.depth)}
/>
```

---

## Datenformat

Jeder Knoten im Baum ist ein `HorizontalTreeData`-Objekt. Nur `name` ist Pflicht — alles andere ist optional:

| Feld | Typ | Funktion |
|---|---|---|
| `name` | `string` | **Pflicht.** Das Label neben dem Knoten-Kreis |
| `id` | `string` | Eindeutiger Bezeichner — empfohlen damit Drill-Down zuverlässig funktioniert |
| `subname` | `string` | Ein zweites, kleineres Label unterhalb von `name` |
| `value` | `number` | Numerischer Wert — per `specialValueA`/`B`-Labels anzeigbar oder für `sortBy: 'value'` nutzbar |
| `specialValueA` | `string \| number` | Zusatztext im Knotenbereich |
| `specialValueB` | `string \| number` | Zweiter Zusatztext |
| `colorConfig` | `object` | Farb-Override für diesen Knoten — siehe [Farben & colorConfig](#farben--colorconfig) |
| `children` | `HorizontalTreeData[]` | Kindknoten — bei Blattknoten weglassen |

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `HorizontalTreeData` | — | **Pflichtfeld.** Wurzelknoten |
| `orientation` | `'LR' \| 'RL' \| 'TB' \| 'BT'` | `'LR'` | Baum-Wachstumsrichtung — siehe [Orientierungen](#orientierungen) |
| `width` | `number` | `800` | SVG-Breite in px |
| `height` | `number` | `500` | SVG-Höhe in px |
| `levelSpacing` | `number` | `200` | Abstand zwischen Tiefenebenen in px |
| `nodeRadius` | `number` | `10` | Knotenkreis-Radius in px |
| `sortBy` | `'name' \| 'value'` | `'name'` | Kinder alphabetisch oder nach Wert sortieren |
| `showLabels` | `boolean` | `true` | Knotenname-Labels anzeigen |
| `showIcons` | `boolean` | `true` | Weißes Icon im Kreis (Ordner für Äste, Person für Blätter) |
| `labelFontSize` | `number` | `12` | Label-Schriftgröße in px |
| `labelColor` | `string` | Theme-Text | Label-Farbe |
| `chartColors` | `string[]` | MUI-Palette | Farben pro Tiefenebene |
| `linkStrokeOpacity` | `number` | `1` | Link-Linien-Deckkraft (0–1) |
| `linkStrokeWidth` | `number` | `1.5` | Link-Linien-Breite in px |
| `linkColor` | `string` | Theme text.secondary | Link-Farbe |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Scroll` visueller Zoom aktivieren |
| `drillable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Klick` Drill-Down aktivieren |
| `duration` | `number` | `750` | Dauer des Drill-in/out-Crossfades in ms. `0` deaktiviert die Animation (sofortiger Sprung). |
| `onFocusChange` | `(zoom) => void` | — | Feuert bei Wechsel des Drill-Down-Fokus |
| `showNodePopover` | `boolean` | `false` | Eingebautes MUI-Popover bei Klick anzeigen |
| `renderNodePopoverContent` | `(info) => ReactNode` | — | Eigener Inhalt im Popover |
| `onNodeClick` | `(info, event) => void` | — | Bei normalem Klick ausgelöst (nicht Ctrl/Cmd+Klick) |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen |
| `translation` | `Partial<HorizontalTreeTranslation>` | EN-Standard | Angezeigte Strings überschreiben |

---

## Orientierungen

Die vier Werte steuern, in welche Richtung der Baum von seiner Wurzel aus wächst:

```tsx
<HorizontalTreeChart data={data} orientation="LR" />  // links → rechts (Standard)
<HorizontalTreeChart data={data} orientation="RL" />  // rechts → links
<HorizontalTreeChart data={data} orientation="TB" />  // oben → unten
<HorizontalTreeChart data={data} orientation="BT" />  // unten → oben
```

**Wann welche Orientierung?**
- `"LR"` — die lesbarste Variante für westliche Lesegewohnheiten; natürlich für Org-Charts und Abhängigkeitsdiagramme
- `"TB"` — gut für Stammbäume oder Hierarchien, die konzeptionell "oben → unten" sind
- `"RL"` / `"BT"` — wenn das Layout deiner Seite es erfordert (z.B. die Wurzel soll rechts auf der Seite stehen)

---

## Interaktionsmodell

> **macOS:** `Cmd ⌘` statt `Ctrl` verwenden.

| Geste | Aktion | Benötigt |
|---|---|---|
| **Klick** | `onNodeClick` sofort ausgelöst | immer |
| **Ctrl / Cmd ⌘+Klick** auf Ast-Knoten | In den Teilbaum hineinzoomen (neu verwurzeln) | `drillable` |
| **Ctrl / Cmd ⌘+Doppelklick** | Eine Ebene herauszoomen | `drillable` |
| **Ctrl / Cmd ⌘+Scroll** | Visueller Zoom — skaliert das SVG | `zoomable` |
| **Escape** | Drill-Down und Zoom zurücksetzen | beide |

**Wie Drill-Down funktioniert:** Ein Klick in einen Ast verwurzelt die gesamte D3-Hierarchie an diesem Knoten neu — nur sein Teilbaum wird angezeigt. Der vorherige Zustand blendet über `duration` ms (Standard `750`) aus, sodass der Übergang fließend wirkt. `onFocusChange` und `onNodeClick` feuern unabhängig von `duration` sofort bei der Interaktion. `duration={0}` springt direkt zum neuen Fokus ohne Animation.

---

## Farben & `colorConfig`

### Standard — MUI-Theme-Palette (pro Tiefenebene)

Ohne Farbkonfiguration erhält jede Tiefenebene des Baums eine andere MUI-Farbe: `primary` → `secondary` → `error` → `warning` → `success` → `info`. Das passt sich automatisch an den Dark Mode an.

### Knoten-individueller Farb-Override

Jeder Knoten kann seine Farbe individuell mit `colorConfig` überschreiben:

```tsx
const data: HorizontalTreeData = {
  id: 'root', name: 'Platform',
  children: [
    // diese Knoten haben eigene Farben, unabhängig von ihrer Tiefenebene
    { id: 'fe', name: 'Frontend', colorConfig: { fill: '#1565C0' } },
    { id: 'be', name: 'Backend',  colorConfig: { fill: '#6A1B9A' } },
  ],
};
```

### Eigene Palette für alle Tiefenebenen

```tsx
<HorizontalTreeChart
  data={data}
  chartColors={['#e53935', '#8e24aa', '#1e88e5', '#43a047']}
/>
```

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Normaler Klick auf einen Knoten | `onNodeClick` |
> | Ctrl / Cmd ⌘+Klick zum Drill-in eines Ast-Knotens | `onFocusChange` |
> | Ctrl / Cmd ⌘+Klick auf Blatt oder Ctrl / Cmd ⌘+Doppelklick zum Drill-out | `onFocusChange` |
> | Escape-Taste (Drill-down und Zoom zurücksetzen) | `onFocusChange` |

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onNodeClick` | `(info: HorizontalTreeNodeInfo, event: React.MouseEvent) => void` | Normaler Klick auf einen Knoten (ohne Ctrl/Cmd) | Detail-Panel oder Popover für den geklickten Knoten anzeigen |
| `onFocusChange` | `(state: { focusedNode: HorizontalTreeNodeInfo; isRoot: boolean }) => void` | Drill-Down-Fokus wechselt via Ctrl/Cmd+Klick, Ctrl/Cmd+Doppelklick oder Escape | Drill-Down-Tiefe verfolgen, Breadcrumb-Navigation |

Das `info`-Objekt, das beiden Callbacks übergeben wird, enthält alles Wissenswerte über den geklickten Knoten:

```ts
type HorizontalTreeNodeInfo = {
  id:            string | null;      // die id des Knotens aus deinen Daten
  name:          string;             // das Label
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;             // 0 = Wurzel, 1 = erste Ebene usw.
  path:          string[];           // Namen von der Wurzel bis zu diesem Knoten
  childrenCount: number;             // 0 bei Blattknoten
  data:          HorizontalTreeData; // der ursprüngliche Knoten aus deinen Daten
};
```

---

## Keine Daten

Wenn `data` weder `children` noch `value` besitzt, rendert die Komponente den String `translation.noData` zentriert im SVG anstelle eines leeren Baums:

```tsx
<HorizontalTreeChart
  data={{ id: 'root', name: 'Root' }}
  translation={{ noData: 'Noch keine Daten' }}
/>
```

Alle Übersetzungsschlüssel sind optional — nicht gesetzte Schlüssel fallen auf die englischen Standardwerte zurück (`noData: 'No data'`, `specialValueA: 'Value A'`, `specialValueB: 'Value B'`).

---

## TypeScript-Typen

```ts
type HorizontalTreeData = {
  id?:            string;
  name:           string;
  subname?:       string;
  value?:         number;
  specialValueA?: string | number;
  specialValueB?: string | number;
  colorConfig?:   { fill?: string; textColor?: string; stroke?: string } | null;
  children?:      HorizontalTreeData[];
};

type HorizontalTreeNodeInfo = {
  id:            string | null;
  name:          string;
  subname:       string | null;
  value:         number | null;
  specialValueA: string | number | null;
  specialValueB: string | number | null;
  depth:         number;
  path:          string[];
  childrenCount: number;
  data:          HorizontalTreeData;
};

type HorizontalTreeOrientation = 'LR' | 'RL' | 'TB' | 'BT';
```

---

## D3-Charts-Familie

Alle 5 D3-Charts sind erschienen:

| Komponente | Status |
|---|---|
| `SunburstChart` | ✅ v2.2.0 |
| `ChordChart` | ✅ v2.3.0 |
| `RadialTreeChart` | ✅ v2.4.0 |
| `CirclePackingChart` | ✅ v2.5.0 |
| `HorizontalTreeChart` | ✅ v2.6.0 |

Offene Feature-Ideen pro Chart: [`component-features-nice-to-have.md`](../component-features-nice-to-have.md).
