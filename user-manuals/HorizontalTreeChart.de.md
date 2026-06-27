# HorizontalTreeChart — Benutzerhandbuch

> [English Version →](HorizontalTreeChart.md)

**Jede Hierarchie als Baum in vier möglichen Orientierungen visualisieren — links→rechts, rechts→links, oben→unten, unten→oben.** `HorizontalTreeChart` für Architekturdiagramme, Org-Charts, Abhängigkeitsbäume, Dateisystem-Hierarchien oder jede Datenstruktur einsetzen, bei der die Eltern→Kind-Beziehung in einer klaren linearen Richtung lesbar sein soll.

## Überblick

Der `HorizontalTreeChart` stellt hierarchische Daten mit D3 v7's Tree-Layout und geschwungenen Bézier-Links dar. Er unterstützt 4 Wachstumsrichtungen, farbige Bubble-Nodes mit Icons, Ctrl / Cmd ⌘+Click Drill-Down und Ctrl / Cmd ⌘+Scroll Zoom. Er ist die fünfte Komponente der **D3-Charts-Familie** und teilt alle Konventionen (`colorConfig`, `chartColors`, `zoomable`, `drillable`, MUI Tooltip) mit seinen Geschwistern.

| Neu in v2.6.0 | |
|---|---|
| **HorizontalTreeChart** | 4 Orientierungen, D3-Tree-Layout, Drill-Down, Zoom, MUI-Theme |
| **`duration`** *(v3.11.0)* | Drill in/out crossfaded jetzt statt abrupt zu wechseln — [→ Interaktionsmodell](#interaktionsmodell) |

> **macOS:** `Cmd ⌘` statt `Ctrl` für alle Tastaturkürzel verwenden.

---

## Props

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `HorizontalTreeData` | — | **Pflichtfeld.** Wurzelknoten |
| `orientation` | `'LR' \| 'RL' \| 'TB' \| 'BT'` | `'LR'` | Baum-Wachstumsrichtung |
| `width` | `number` | `800` | SVG-Breite in px |
| `height` | `number` | `500` | SVG-Höhe in px |
| `levelSpacing` | `number` | `200` | Abstand zwischen Tiefenebenen in px |
| `nodeRadius` | `number` | `10` | Knotenkreis-Radius in px |
| `sortBy` | `'name' \| 'value'` | `'name'` | Kinder-Sortierung |
| `showLabels` | `boolean` | `true` | Knotenname-Labels anzeigen |
| `showIcons` | `boolean` | `true` | Weißes Icon im Kreis (Folder/Person) |
| `chartColors` | `string[]` | MUI-Palette | Farben pro Tiefenebene |
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Scroll` visueller Zoom |
| `drillable` | `boolean` | `false` | `Ctrl / Cmd ⌘+Click` Drill-Down |
| `duration` | `number` | `750` | Dauer des Drill-in/out-Crossfades in ms. `0` deaktiviert ihn (sofortiger Sprung). |
| `showNodePopover` | `boolean` | `false` | Eingebautes MUI-Popover bei Klick |
| `onNodeClick` | `(info, event) => void` | — | Bei normalem Klick ausgelöst |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen |

---

## Interaktionsmodell

| Geste | Aktion | Benötigt |
|---|---|---|
| **Klick** | `onNodeClick` sofort | immer |
| **Ctrl / Cmd ⌘+Klick** auf Branch | Drill-Down | `drillable` |
| **Ctrl / Cmd ⌘+Doppelklick** | Zoom out | `drillable` |
| **Ctrl / Cmd ⌘+Scroll** | Visueller Zoom | `zoomable` |
| **Escape** | Alles zurücksetzen | beide |

**Drill-Übergänge:** Drill-in/out verwurzelt die zugrundeliegende D3-Hierarchie komplett neu — jede Fokus-Ebene hat ihren eigenen, unterschiedlich großen Knoten-Satz. Statt einzelne Knoten-Positionen zu interpolieren (was Enter/Update/Exit-Matching per Knoten-ID bräuchte), blendet der vorherige Layout-Zustand über `duration` ms (Standard `750`) aus, während der neue darunter erscheint — gerendert als statischer, nicht-interaktiver Ghost-Layer. `onFocusChange`/`onNodeClick` feuern unabhängig von `duration` sofort bei der Interaktion. `duration={0}` deaktiviert das und springt direkt zum neuen Fokus.

---

## Orientierungen

```tsx
<HorizontalTreeChart data={data} orientation="LR" />  // links → rechts (Standard)
<HorizontalTreeChart data={data} orientation="RL" />  // rechts → links
<HorizontalTreeChart data={data} orientation="TB" />  // oben → unten
<HorizontalTreeChart data={data} orientation="BT" />  // unten → oben
```

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Normaler Klick auf einen Knoten | `onNodeClick` |
> | Strg / Cmd ⌘+Klick zum Drill-in eines Branch-Knotens | `onFocusChange` |
> | Strg / Cmd ⌘+Klick auf Blatt oder Strg / Cmd ⌘+Doppelklick zum Drill-out | `onFocusChange` |
> | Escape-Taste (Drill-down und Zoom zurücksetzen) | `onFocusChange` |

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onNodeClick` | `(info: HorizontalTreeNodeInfo, event: React.MouseEvent) => void` | Normaler Klick auf einen Knoten (ohne Strg/Cmd) | Detail-Panel oder Popover für den geklickten Knoten anzeigen |
| `onFocusChange` | `(state: { focusedNode: HorizontalTreeNodeInfo; isRoot: boolean }) => void` | Drill-Down-Fokus wechselt via Strg/Cmd+Klick, Strg/Cmd+Doppelklick oder Escape | Drill-Down-Tiefe verfolgen, Breadcrumb-Navigation |

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
