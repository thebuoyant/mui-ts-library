# RadialStackedBarChart — Benutzerhandbuch

> [English Version →](RadialStackedBarChart.md)

**Mehrere Kategorien gleichzeitig über verschiedene Teilreihen vergleichen — Bevölkerung nach Altersgruppe, Quartalsumsatz nach Region oder beliebige mehrdimensionale Daten — als radiales gestapeltes Balkendiagramm.** `RadialStackedBarChart` einsetzen, wenn der visuelle Eindruck einer Kreisanordnung und die analytische Tiefe einer Stapelaufteilung gleichzeitig gebraucht werden.

## Überblick

`RadialStackedBarChart` ordnet Balken kreisförmig an: Jeder Balken strahlt von einer gemeinsamen Mittelöffnung nach außen und ist in **gestapelte Segmente** unterteilt — eines pro Reihenschlüssel (z. B. „Q1", „Q2", Altersgruppen). Die Balkenhöhe ist proportional zum Gesamtwert; die Segmente innerhalb eines Balkens sind proportional zum jeweiligen Anteil der Reihe.

### Was macht diese Komponente?

Der Nutzer sieht einen Ring nach außen zeigender Balken, angeordnet wie Speichen eines Rads. Jeder Balken ist am Außenrand beschriftet (z. B. Bundesstaatskürzel oder Stadtname). Die Farben werden per Legende in der Mittelöffnung den Reihen zugeordnet.

**Konzentrische gestrichelte Ringe** markieren Wert-Meilensteine (z. B. 10 Mio., 20 Mio. Einwohner), oben beschriftet. Der innerste Ring markiert die Basislinie (Nullwert).

**Hover** auf ein Segment zeigt einen Tooltip mit drei Zeilen:
- Der Balkenname (z. B. „California")
- Reihennamen und Wert (z. B. „25 bis 44 Jahre: 9.109.000")
- Prozentualer Anteil und Gesamtwert (z. B. „26 % · Gesamt: 34.224.000")

**Klick** auf ein Segment löst `onBarClick` mit dem vollständigen Balken- und Reihenkontext aus — nützlich, um das Diagramm mit einer Datentabelle oder einem Detailpanel zu verknüpfen.

**Zoom** (`Ctrl / Cmd ⌘ + Scroll`, erfordert `zoomable={true}`): Vergrößern/Verkleinern für dichte Datensätze. `Escape` setzt zurück.

> **Typische Einsatzgebiete:**
>
> - Bevölkerung nach Altersgruppe über Bundesstaaten / Länder hinweg
> - Quartalsumsatz / -kosten nach Region aufgeschlüsselt
> - Umfrageergebnisse nach Kategorie über mehrere Gruppen
> - Beliebige Mehrreihendaten, bei denen eine Kreisanordnung viele Elemente vergleichbar macht

| Neu in v3.15.0 | |
|---|---|
| **RadialStackedBarChart** | Neues D3-Chart — radiale gestapelte Balken, konfigurierbare Gitterringe, Zentrums-Legende, sortBy, Custom-Colors, Zoom, `onBarClick` |

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
import { RadialStackedBarChart } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RadialStackedBarData,
  RadialStackedBarSeries,
  RadialStackedBarBarInfo,
  RadialStackedBarColorConfigs,
  RadialStackedBarChartProps,
  RadialStackedBarChartTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { RadialStackedBarChart } from '@thebuoyant-tsdev/mui-ts-library';
import type { RadialStackedBarData, RadialStackedBarSeries } from '@thebuoyant-tsdev/mui-ts-library';

// Ein Element pro Balken — eindeutige id, Anzeigebezeichnung und ein Wert pro Reihenschlüssel
const data: RadialStackedBarData[] = [
  { id: 'berlin',    label: 'Berlin',    values: { q1: 120, q2: 145, q3: 98,  q4: 175 } },
  { id: 'munich',    label: 'München',   values: { q1: 210, q2: 185, q3: 220, q4: 195 } },
  { id: 'hamburg',   label: 'Hamburg',   values: { q1: 95,  q2: 110, q3: 88,  q4: 130 } },
  { id: 'frankfurt', label: 'Frankfurt', values: { q1: 165, q2: 150, q3: 180, q4: 200 } },
];

// Reihen = die Teilgruppen, die sich innerhalb jedes Balkens stapeln
const keys: RadialStackedBarSeries[] = [
  { key: 'q1', label: 'Q1' }, // key muss dem Feldnamen in values{} entsprechen
  { key: 'q2', label: 'Q2' }, // label erscheint in der Zentrums-Legende
  { key: 'q3', label: 'Q3' },
  { key: 'q4', label: 'Q4' },
];

function App() {
  return (
    <RadialStackedBarChart
      data={data}   // Array der Balken
      keys={keys}   // Reihendefinitionen, in Stapelreihenfolge (innerster Balken zuerst)
      size={480}    // SVG-Breite und -Höhe in px
    />
  );
}
```

> **Minimalversion:** Für einfache Reihennamen ohne separate Legendenbeschriftungen `keys` als `string[]` übergeben:
> ```tsx
> <RadialStackedBarChart data={data} keys={['q1', 'q2', 'q3', 'q4']} />
> ```
> Der String dient gleichzeitig als `values`-Feldschlüssel und als Legendenbeschriftung.

---

## Props

### Kerndaten

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `data` | `RadialStackedBarData[]` | — | **Pflicht.** Array der Balken. Jedes Element ist eine Speiche des Rads. |
| `keys` | `RadialStackedBarSeries[] \| string[]` | — | **Pflicht.** Reihendefinitionen in Stapelreihenfolge (innerstes Segment zuerst). |
| `size` | `number` | `500` | SVG-Breite und -Höhe in Pixeln (immer quadratisch). |
| `innerRadius` | `number` | `size × 0,18` | Radius der Mittelöffnung in px. Vergrößern für mehr Platz in der Zentrums-Legende. |
| `barPadding` | `number` | `0,12` | Anteilsmäßiger Abstand zwischen benachbarten Balken — `0` = kein Abstand, `1` = nur Abstand. |

### Gitter

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `showGridLines` | `boolean` | `true` | Konzentrische Gitterringe ein-/ausblenden. |
| `gridLineCount` | `number` | `3` | Anzahl der konzentrischen Gitterringe (D3-Tick-Näherung). |
| `showGridValues` | `boolean` | `true` | Wertbeschriftungen am oberen Ende jedes Gitterrings ein-/ausblenden. |
| `gridValueFormatter` | `(value: number) => string` | Kompaktnotation | Eigene Formatierungsfunktion für die Gitterring-Labels. Beispiel: `(v) => \`${(v / 1e6).toFixed(0)} Mio.\`` |

### Beschriftungen & Legende

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `showLabels` | `boolean` | `true` | Balken-IDs am Außenrand des Diagramms ein-/ausblenden. |
| `showLegend` | `boolean` | `true` | Reihen-Farblegende in der Mittelöffnung ein-/ausblenden. |

### Sortierung

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `sortBy` | `'value' \| 'label' \| 'none'` | `'none'` | Balken nach Gesamtwert absteigend, nach Label aufsteigend (A → Z) sortieren oder ursprüngliche Array-Reihenfolge beibehalten. |

### Wertformatierung (Tooltips)

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `valueDecimalCount` | `number` | `0` | Dezimalstellen für Segmentwerte in Tooltips. |
| `valueDecimalSeparator` | `string` | `'.'` | Dezimaltrennzeichen. |
| `valueThousandsSeparator` | `string` | `','` | Tausendertrennzeichen. |
| `valueFormatter` | `(value: number, seriesKey: string) => string` | — | Eigene Formatierungsfunktion für alle Tooltip-Werte. Überschreibt `valueDecimalCount` / `valueDecimalSeparator` / `valueThousandsSeparator`. `seriesKey` ist der Reihenschlüssel für Segmentwerte oder ein leerer String `""` für die Gesamtzeile. *Ab v3.22.0* |

### Farben

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `chartColors` | `string[]` | MUI-Theme-Palette | Eigene Farbpalette für alle Reihen. Fällt auf MUI-Theme-Tokens zurück, wenn nicht gesetzt. |
| `colorConfig` | `RadialStackedBarColorConfigs` | — | Reihenweise Farbüberschreibungen nach Reihenschlüssel. Hat Vorrang vor `chartColors`. |

### Interaktion

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `zoomable` | `boolean` | `false` | `Ctrl / Cmd ⌘ + Scroll` visuellen Zoom aktivieren — Inhalt außerhalb von `size` wird abgeschnitten. `Escape` setzt zurück. |
| `onBarClick` | `(info: RadialStackedBarBarInfo, event: React.MouseEvent) => void` | — | Wird ausgelöst, wenn der Nutzer auf ein Balkensegment klickt. |
| `disabled` | `boolean` | `false` | Deaktiviert alle Interaktionen und reduziert die Deckkraft auf `0,5`. |

### Lokalisierung

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `translation` | `Partial<RadialStackedBarChartTranslation>` | EN-Standards | Beliebige Übersetzungszeichenkette überschreiben. Nur abweichende Schlüssel angeben. |

---

## TypeScript-Typen

```ts
// Ein Balken (eine Speiche des Rads)
type RadialStackedBarData = {
  id:     string;                     // eindeutige Kennung — React-Key und Callback-Payload
  label:  string;                     // Außenrand-Beschriftung
  values: Record<string, number>;     // Wert pro Reihenschlüssel — fehlende Schlüssel = 0
};

// Eine Reihe (eine Farbschicht im Stapel)
type RadialStackedBarSeries = {
  key:    string;  // muss einem Schlüssel in values{} entsprechen
  label?: string;  // Legendenbeschriftung — fällt auf key zurück, wenn nicht gesetzt
};

// Payload an onBarClick
type RadialStackedBarBarInfo = {
  id:        string;
  label:     string;
  seriesKey: string;                  // die Reihe, auf die geklickt wurde
  value:     number;                  // Wert des angeklickten Segments
  total:     number;                  // Gesamtwert des Balkens (Summe aller Reihen)
  values:    Record<string, number>;  // alle Werte dieses Balkens
};

// Reihenweise Farbüberschreibungen
type RadialStackedBarColorConfigs = Record<string, { fill?: string } | null>;

type RadialStackedBarChartTranslation = {
  noData: string; // angezeigt wenn data oder keys leer ist
};
```

---

## Datenstruktur

Jedes Element in `data` entspricht **einem Balken** (einer Winkelposition auf dem Rad). Das `values`-Objekt bildet **Reihenschlüssel** auf Zahlen ab:

```ts
{ id: 'ca', label: 'CA', values: { under5: 2_486_000, age5_13: 4_926_000, age65plus: 4_032_000 } }
//                                  ↑ muss einem Schlüssel im keys[]-Array entsprechen
```

Fehlende Reihenschlüssel in `values` werden stillschweigend als `0` behandelt — jeder Slot muss nie explizit befüllt werden.

> **Reihenfolge ist entscheidend beim Stapeln:** Reihen werden in der Reihenfolge gestapelt, in der sie in `keys[]` erscheinen. Der erste Schlüssel bildet das innerste (unterste) Segment, der letzte das äußerste (oberste) Segment.

---

## Gitter

Konzentrische gestrichelte Ringe markieren Wert-Meilensteine auf der radialen (Y-)Achse. D3 wählt automatisch „schöne" Tick-Werte basierend auf `maxTotal` und `gridLineCount`.

```tsx
// Standard: 3 Ringe mit Kompaktbeschriftungen (30000 → "30k", 3000000 → "3M")
<RadialStackedBarChart data={data} keys={keys} />

// Eigene Ringanzahl
<RadialStackedBarChart data={data} keys={keys} gridLineCount={5} />

// Vollständig eigene Gitter-Wertbeschriftungen
<RadialStackedBarChart
  data={data}
  keys={keys}
  gridValueFormatter={(v) => `${(v / 1_000_000).toFixed(1)} Mio.`}
/>

// Gitter komplett ausblenden
<RadialStackedBarChart data={data} keys={keys} showGridLines={false} />
```

---

## Sortierung

```tsx
// Ursprüngliche Daten-Array-Reihenfolge beibehalten (Standard)
<RadialStackedBarChart data={data} keys={keys} sortBy="none" />

// Größter Gesamtbalken zuerst (oben am Rad, im Uhrzeigersinn abnehmend)
<RadialStackedBarChart data={data} keys={keys} sortBy="value" />

// Alphabetisch aufsteigend nach Label
<RadialStackedBarChart data={data} keys={keys} sortBy="label" />
```

---

## Farben

### Standard — MUI-Theme-Palette (automatisch)

Wenn `chartColors` nicht gesetzt ist, verwendet das Diagramm MUI-Theme-Tokens in dieser Reihenfolge:

| Reihen-Index | MUI-Token |
|---|---|
| 0 | `theme.palette.primary.main` |
| 1 | `theme.palette.secondary.main` |
| 2 | `theme.palette.success.main` |
| 3 | `theme.palette.warning.main` |
| 4 | `theme.palette.error.main` |
| 5 | `theme.palette.info.main` |
| 6+ | `#8e24aa`, `#00897b`, `#f06292`, … |

**Dark Mode wird automatisch unterstützt** — Farben passen sich an, wenn der Nutzer zum dunklen MUI-Theme wechselt.

### Eigene Palette

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  chartColors={['#1565C0', '#6A1B9A', '#00695C', '#E65100', '#AD1457', '#F57F17', '#4E342E']}
/>
```

### Reihenweise Farbüberschreibung

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  colorConfig={{
    q2: { fill: '#f57c00' },  // Brand-Orange für Q2 — überschreibt chartColors
    q4: { fill: '#6a1b9a' },  // Brand-Lila für Q4
    // q1 und q3 fallen auf chartColors / MUI-Palette zurück
  }}
/>
```

`colorConfig` akzeptiert `null` oder einen weggelassenen Schlüssel, um auf `chartColors` zurückzufallen. `fill` ist das einzige aktuell unterstützte Feld.

---

## Interaktionsmodell

| Geste | Aktion |
|---|---|
| **Hover** auf ein Segment | Zeigt Tooltip: Balkenname, Reihenname + Wert, Prozentwert + Gesamtwert |
| **Klick** auf beliebiges Segment | Löst `onBarClick(info, event)` aus — siehe Typ `RadialStackedBarBarInfo` |
| **Ctrl / Cmd ⌘ + Scroll** *(erfordert `zoomable`)* | Visuell rein-/herauszoomen — Inhalt wird am `size`-Rand abgeschnitten |
| **Escape** *(erfordert `zoomable`)* | Zoom auf 1× zurücksetzen |

> **macOS:** `Cmd ⌘` statt `Ctrl` für den Zoom verwenden.

### `onBarClick`-Payload

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  onBarClick={(info, event) => {
    console.log(info.id);        // "berlin"
    console.log(info.label);     // "Berlin"
    console.log(info.seriesKey); // "q2"         — die angeklickte Reihe
    console.log(info.value);     // 145           — Wert des angeklickten Segments
    console.log(info.total);     // 660           — Summe aller Reihen dieses Balkens
    console.log(info.values);    // { q1: 120, q2: 145, q3: 98, q4: 175 }
  }}
/>
```

---

## Deaktivierter Zustand

```tsx
<RadialStackedBarChart data={data} keys={keys} disabled />
```

Alle Interaktionen sind deaktiviert (Tooltips, Klicks, Zoom). Das Diagramm wird mit Deckkraft `0,5` dargestellt. Nützlich für schreibgeschützte Dashboards oder Ladezustände.

---

## Leerer Zustand

Wenn `data` oder `keys` leer ist, zeigt das Diagramm eine Leer-Zustand-Meldung statt eines SVG:

```tsx
<RadialStackedBarChart data={[]} keys={keys} />
{/* Zeigt: "No data" */}

<RadialStackedBarChart
  data={[]}
  keys={keys}
  translation={{ noData: 'Keine Daten für diesen Zeitraum' }}
/>
```

---

## Lokalisierung

Nur die abweichenden Schlüssel angeben — nicht gesetzte Schlüssel fallen auf die englischen Standards zurück:

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  translation={{ noData: 'Keine Daten vorhanden' }}
/>
```

| Schlüssel | Standard (EN) | Beschreibung |
|---|---|---|
| `noData` | `'No data'` | Angezeigt wenn `data` oder `keys` leer ist |

---

## Rezepte

### Großer Datensatz mit kompakten Gitter-Labels

```tsx
const US_BUNDESSTAATEN: RadialStackedBarData[] = [/* 20 Bundesstaaten × 7 Altersgruppen */];
const ALTERSGRUPPEN: RadialStackedBarSeries[] = [
  { key: 'under5',    label: 'Unter 5 Jahre' },
  { key: 'age5_13',   label: '5–13 Jahre' },
  { key: 'age14_17',  label: '14–17 Jahre' },
  { key: 'age18_24',  label: '18–24 Jahre' },
  { key: 'age25_44',  label: '25–44 Jahre' },
  { key: 'age45_64',  label: '45–64 Jahre' },
  { key: 'age65plus', label: '65 Jahre und älter' },
];

<RadialStackedBarChart
  data={US_BUNDESSTAATEN}
  keys={ALTERSGRUPPEN}
  size={600}
  sortBy="value"
  gridValueFormatter={(v) => `${(v / 1_000_000).toFixed(0)} Mio.`}
  zoomable
/>
```

### Verknüpftes Detailpanel per `onBarClick`

```tsx
const [detail, setDetail] = useState<RadialStackedBarBarInfo | null>(null);

<Box sx={{ display: 'flex', gap: 2 }}>
  <RadialStackedBarChart
    data={data}
    keys={keys}
    onBarClick={(info) => setDetail(info)}
  />
  {detail && (
    <Box>
      <Typography variant="h6">{detail.label}</Typography>
      <Typography>Gesamt: {detail.total}</Typography>
      {Object.entries(detail.values).map(([k, v]) => (
        <Typography key={k}>{k}: {v}</Typography>
      ))}
    </Box>
  )}
</Box>
```

### Währungsformatierung in Tooltips

```tsx
<RadialStackedBarChart
  data={umsatzDaten}
  keys={quartalKeys}
  valueDecimalCount={2}
  valueDecimalSeparator=","
  valueThousandsSeparator="."
  gridValueFormatter={(v) => `€ ${(v / 1000).toFixed(0)}k`}
/>
```

### Kompaktes Diagramm ohne Beschriftungen und Legende

```tsx
<RadialStackedBarChart
  data={data}
  keys={keys}
  size={320}
  showLabels={false}
  showLegend={false}
  showGridValues={false}
/>
```

---

## D3-Charts-Familie

`RadialStackedBarChart` ist die 6. Komponente der **D3-Charts-Familie**:

| Komponente | Beschreibung | Status |
|---|---|---|
| `SunburstChart` | Konzentrische-Ringe-Hierarchiediagramm | ✅ v2.2.0 |
| `ChordChart` | Fluss- und Beziehungsdiagramm zwischen Gruppen | ✅ v2.3.0 |
| `RadialTreeChart` | Radialer Baum mit eigenen Knoten-Icons | ✅ v2.4.0 |
| `CirclePackingChart` | Verschachtelte Kreise mit animiertem Zoom | ✅ v2.5.0 |
| `HorizontalTreeChart` | Entscheidungsbäume in 4 Ausrichtungen | ✅ v2.6.0 |
| `RadialStackedBarChart` | Mehrreihen-Stapelbalken im radialen Layout | ✅ v3.15.0 |

Alle D3-Charts folgen denselben Konventionen: `chartColors`, `translation`, `disabled`, `onXxxClick`, MUI-Theme-Integration, Dark-Mode-Unterstützung und `Ctrl / Cmd ⌘ + Scroll`-Zoom. Offene Feature-Ideen in [`component-features-nice-to-have.md`](../component-features-nice-to-have.md).
