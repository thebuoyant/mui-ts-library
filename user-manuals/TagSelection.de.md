# TagSelection — Benutzerhandbuch

> [English Version →](TagSelection.md)

**Multi-Select-Eingabe mit Autocomplete, Chip-Anzeige und freier Tag-Erstellung — alles in einer Komponente.** `TagSelection` überall einsetzen, wo Nutzer aus einer Liste wählen oder neue Labels erstellen sollen: Filter-Leisten, Content-Tagging, Skill-Auswahl, Kategorie-Picker.

## Überblick

Die `TagSelection`-Komponente ist ein flexibles Multi-Tag-Auswahlfeld auf Basis von React und Material UI. Sie kombiniert eine Such-Autocomplete-Eingabe mit einer Chip-basierten Anzeige der ausgewählten Tags und unterstützt asynchrones Laden, Tag-Limits, freie Tag-Erstellung und vollständige Tastatursteuerung.

**Typische Einsatzgebiete:**

- Schlagwort- oder Kategorie-Zuweisung in Formularen (Artikel, Produkte, Tickets)
- Skill-Auswahl in HR- oder Profil-Verwaltungsanwendungen
- Filterauswahl in Suchmasken und Dashboard-Filtern
- Tag-basiertes Labeling in Content-Management-Systemen

---

## Technische Voraussetzungen

| Abhängigkeit | Mindestversion |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| Zustand | 5 |

---

## Import

```tsx
import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library';
import type {
  TagSelectionItem,
  TagSelectionProps,
  TagSelectionTranslation,
  TagColor,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Schnellstart

```tsx
import { TagSelection } from '@thebuoyant-tsdev/mui-ts-library';
import type { TagSelectionItem } from '@thebuoyant-tsdev/mui-ts-library';
import { useState } from 'react';

const initialTags: TagSelectionItem[] = [
  { id: 'react',      label: 'React',      selected: true  },
  { id: 'typescript', label: 'TypeScript', selected: true  },
  { id: 'vue',        label: 'Vue'                         },
  { id: 'angular',    label: 'Angular'                     },
  { id: 'legacy',     label: 'Legacy',     disabled: true  },
];

function App() {
  const [tags, setTags] = useState(initialTags);

  return (
    <TagSelection
      tags={tags}
      onTagsChange={(selectedTags, allTags) => setTags(allTags)}
    />
  );
}
```

---

## Props-Referenz

### Datenstruktur: `TagSelectionItem`

Jeder Tag wird als `TagSelectionItem`-Objekt übergeben. Das gesamte Array (ausgewählte, verfügbare und deaktivierte Tags) wird in der `tags`-Prop zusammengefasst.

| Feld | Typ | Pflicht | Beschreibung |
|---|---|---|---|
| `id` | `string` | **Ja** | Eindeutige Kennung des Tags. Wird als React-Key und für interne Store-Operationen (Select/Delete) verwendet. Muss innerhalb des `tags`-Arrays einmalig sein. |
| `label` | `string` | **Ja** | Angezeigter Text des Tags — erscheint im Chip und in der Autocomplete-Dropdown-Liste. |
| `selected` | `boolean` | Nein | Wenn `true`, ist der Tag initial ausgewählt und erscheint im Chip-Bereich. Standard: `false`. |
| `disabled` | `boolean` | Nein | Wenn `true`, ist der Tag nicht auswählbar und erscheint nicht in der Autocomplete-Dropdown-Liste. Bereits ausgewählte Tags können bei `disabled: true` nicht gelöscht werden. |
| `color` | `TagColor` | Nein | Semantische MUI-Theme-Farbe des Chips: `"default"` · `"primary"` · `"secondary"` · `"error"` · `"info"` · `"success"` · `"warning"`. Empfohlener Weg für Dark-Mode-kompatible Farbgebung, da die Farben aus dem aktiven MUI-Theme stammen. |
| `foregroundColor` | `string` | Nein | Individuelle Schriftfarbe als CSS-Farbwert (z. B. `"#ffffff"`). Hat Vorrang vor `color`. Escape-Hatch für Branding-Farben, die nicht im MUI-Theme definiert sind. |
| `backgroundColor` | `string` | Nein | Individuelle Hintergrundfarbe als CSS-Farbwert. Wird auch als Rahmenfarbe verwendet. Hat Vorrang vor `color`. |

> **Hinweis zu Farb-Priorität:** Wenn `foregroundColor` oder `backgroundColor` gesetzt sind, wird `color` komplett ignoriert. Die beiden Systeme schließen sich gegenseitig aus.

**TypeScript-Typen:**

```ts
type TagColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

type TagSelectionItem = {
  id:               string;
  label:            string;
  selected?:        boolean;
  disabled?:        boolean;
  color?:           TagColor;
  foregroundColor?: string;
  backgroundColor?: string;
};
```

---

### Komponenten-Props: `TagSelectionProps`

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `allowCreate` | `boolean` | `false` | Aktiviert den freien Texteingabe-Modus. Wenn der Nutzer einen Text eintippt, der keinem bestehenden Tag entspricht, wechselt das Eingabefeld in den Create-Mode: Im Input erscheinen ein CheckIcon (bestätigen) und ein CloseIcon (abbrechen), darunter wird eine Farb-Zeile angezeigt — 7 semantische Theme-Farb-Chips (Dark-Mode-kompatibel) plus ein **Regenbogen-Chip**, der ein Custom-Color-Picker-Panel öffnet (Hintergrundfarbe + Textfarbe, mit Hex-Eingaben und "Auto"-Kontrast-Umschalter). Der neue Tag wird intern sofort als selektiert markiert. Bestätigen per CheckIcon oder **Enter**. |
| `chipSize` | `"small" \| "medium"` | `"small"` | Größe aller Chips — sowohl im Auswahl-Bereich als auch in der Dropdown-Liste. Sollte zur `inputSize` passen (`"small"` + `"small"` oder `"medium"` + `"medium"`). |
| `disabled` | `boolean` | `false` | Deaktiviert die gesamte Komponente. Das Autocomplete-Eingabefeld wird gesperrt; ausgewählte Chips werden grau dargestellt und sind nicht löschbar. Nützlich während Formular-Submissions oder in reinen Lese-Ansichten. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Größe der Autocomplete-Eingabe gemäß MUI-Standard. Beeinflusst Schriftgröße, Innenabstand und Höhe des Eingabefelds. |
| `listboxMaxHeight` | `number` | — | Maximale Höhe der Autocomplete-Dropdown-Liste in Pixeln. Sobald die Liste höher wäre, erscheint eine vertikale Scrollbar. Ohne diesen Prop gilt MUI's interner Standard. |
| `loading` | `boolean` | `false` | Zeigt einen Ladezustand im Autocomplete-Dropdown an. Gedacht für asynchrones Laden von Tags aus einer API. Die Ladeanimation erscheint wenn das Dropdown geöffnet ist und das `tags`-Array noch leer ist. |
| `maxTags` | `number` | — | Maximale Anzahl gleichzeitig auswählbarer Tags. Wenn das Limit erreicht ist, wird das Autocomplete-Eingabefeld automatisch deaktiviert und ein Hinweistext erscheint. Das Entfernen eines ausgewählten Tags entsperrt das Feld wieder. |
| `maxVisibleChips` | `number` | — | Maximale Anzahl sichtbarer Chips im Auswahl-Bereich. Überzählige Chips werden hinter einem `+N`-Chip verborgen. Ein Klick auf `+N` öffnet einen Popover mit den versteckten Chips — diese können dort auch gelöscht werden. Ohne diesen Prop werden alle Chips angezeigt. |
| `popoverPlacement` | `"top" \| "bottom"` | `"bottom"` | Öffnungsrichtung des Overflow-Popovers (relativ zum `+N`-Chip). Nur relevant wenn `maxVisibleChips` gesetzt ist. |
| `showAutoComplete` | `boolean` | `true` | Zeigt das Such-Eingabefeld an. Wenn `false`, kann der Nutzer keine neuen Tags auswählen — der Chip-Bereich bleibt sichtbar (reine Anzeige). |
| `showSelectedTags` | `boolean` | `true` | Zeigt den oberen Bereich mit den ausgewählten Tags als Chips an. Wenn `false`, wird der gesamte Chip-Bereich ausgeblendet — die Autocomplete bleibt sichtbar. |
| `showSelectedTagsLabel` | `boolean` | `true` | Zeigt das Label-Heading über dem Chip-Bereich an (Standard: „Selected tags"). Kann versteckt werden wenn der Kontext selbsterklärend ist. |
| `tags` | `TagSelectionItem[]` | — | **Pflichtfeld.** Vollständiges Tag-Array inklusive ausgewählter, verfügbarer und deaktivierter Tags. Zustandsänderungen (Select, Delete, Create) werden über Callbacks nach oben gespiegelt. |
| `translation` | `Partial<TagSelectionTranslation>` | Englische Defaults | Texte für alle angezeigten Beschriftungen. Nur abweichende Keys angeben — nicht gesetzte Keys fallen auf die englischen Standardwerte zurück. Siehe [Texte & Übersetzungen](#texte--übersetzungen). |

---

## Callbacks / Events

> **Welcher Callback feuert bei welcher Aktion?**
>
> | Aktion | Ausgelöste Callbacks |
> |---|---|
> | Vorhandenen Tag auswählen | `onTagSelect` · `onTagsChange` |
> | Ausgewählten Tag löschen | `onTagDelete` · `onTagsChange` |
> | Neuen Tag erstellen | `onTagCreate` · `onTagsChange` |
> | Im Suchfeld tippen | `onSearchChange` |
>
> **Empfehlung:** `onTagsChange` für einfache State-Synchronisation verwenden. Spezifische Callbacks nur hinzufügen, wenn auf unterschiedliche Aktionstypen verschieden reagiert werden muss.

| Callback | Signatur | Wann ausgelöst | Verwenden wenn... |
|---|---|---|---|
| `onTagsChange` | `(selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Nach jeder Auswahländerung (Auswählen, Löschen, Erstellen) | Einfache State-Synchronisation — für die meisten Apps ausreichend |
| `onTagSelect` | `(tag: TagSelectionItem, selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Ein vorhandener Tag wurde aus dem Dropdown ausgewählt | Auf Auswählen vs. Erstellen vs. Löschen unterschiedlich reagiert werden soll |
| `onTagDelete` | `(tag: TagSelectionItem, selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Das Lösch-Icon eines ausgewählten Chips wurde geklickt | Speziell auf das Entfernen von Tags reagiert werden soll |
| `onTagCreate` | `(tag: TagSelectionItem) => void` | Nutzer hat neuen Tag bestätigt (✓ oder Enter) | Neue Tags im Backend persistiert werden sollen |
| `onSearchChange` | `(value: string) => void` | Jeder Tastendruck im Suchfeld | Serverseitige Filterung / asynchrones Tag-Laden |

> **Wichtig zu `onTagCreate`:** Der neue Tag wird von der Komponente intern sofort mit `selected: true` und der vom Nutzer gewählten Farbe in den Store eingefügt — entweder `color` (Theme-Farbe) oder `backgroundColor`/`foregroundColor` (Custom-Farbe). `onTagCreate` wird danach mit diesem vollständigen `TagSelectionItem`-Objekt ausgelöst, damit der Aufrufer es persistieren / seinen externen State synchronisieren kann:
>
> ```tsx
> onTagCreate={(tag) => {
>   setTags((prev) => [...prev, tag]);
> }}
> ```

---

## Texte & Übersetzungen {#texte--übersetzungen}

Alle angezeigten Texte können über die `translation`-Prop überschrieben werden. Es müssen nur die Keys angegeben werden, die vom Standard abweichen. Die englischen Standardwerte können direkt importiert werden:

```ts
import { DEFAULT_TAG_SELECTION_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
import type { TagSelectionTranslation } from '@thebuoyant-tsdev/mui-ts-library';

// Vollständiger TypeScript-Typ:
type TagSelectionTranslation = {
  selectedTagsLabel:   string;
  autoCompleteLabel:   string;
  noSelectedTagsText:  string;
  noAvailableTagsText: string;
  placeholder:         string;
  loadingText:         string;
  maxTagsReachedText:  string;
  colorPickerLabel:    string;
  backgroundColorLabel: string;
  textColorLabel:      string;
  autoTextColorLabel:  string;
  confirmCreateLabel?: string;
  cancelCreateLabel?:  string;
};
```

> **⚠️ Kompatibilitäts-Hinweis:** `confirmCreateLabel` und `cancelCreateLabel` (hinzugefügt in `v3.4.0`) sind bei diesem Typ optional — im Gegensatz zu den anderen Keys, die erforderlich sind. Das ist bewusst so: dadurch kompiliert älterer Code, der ein vollständiges `TagSelectionTranslation`-Literal deklariert (statt ein partielles Objekt an die `translation`-Prop zu übergeben), auch dann weiter, wenn wir künftig neue Keys hinzufügen. Intern löst die Komponente fehlende Keys immer gegen `DEFAULT_TAG_SELECTION_TRANSLATION` auf — du musst sie also nie angeben.

| Key | Standard-Wert | Beschreibung |
|---|---|---|
| `selectedTagsLabel` | `"Selected tags"` | Überschrift über dem Chip-Bereich. Nur sichtbar wenn `showSelectedTagsLabel={true}`. |
| `autoCompleteLabel` | `"Search and add tags"` | Label des Autocomplete-Eingabefelds (schwebend, MUI-Standard). Dient gleichzeitig als `aria-label` für Screenreader. |
| `noSelectedTagsText` | `"No tags selected."` | Hinweistext im Chip-Bereich wenn noch keine Tags ausgewählt sind. |
| `noAvailableTagsText` | `"No tags available."` | Text in der Dropdown-Liste wenn keine passenden Tags gefunden werden (Filterung oder leere Liste). |
| `placeholder` | `"Type to search..."` | Platzhaltertext im Autocomplete-Eingabefeld. |
| `loadingText` | `"Loading..."` | Text in der Dropdown-Liste während des Ladevorgangs (`loading={true}`). |
| `maxTagsReachedText` | `"Maximum number of tags reached."` | Hilfstext unterhalb des Eingabefelds wenn das Tag-Limit erreicht ist (`maxTags` gesetzt). |
| `colorPickerLabel` | `"Custom color"` | Tooltip für den Regenbogen-Chip, der das Custom-Color-Picker-Panel im Create-Mode öffnet (`allowCreate={true}`). |
| `backgroundColorLabel` | `"Background color"` | Überschrift über den Hintergrundfarb-Swatches und dem Hex-Input im Custom-Color-Picker-Panel. |
| `textColorLabel` | `"Text color"` | Überschrift über den Textfarb-Swatches und dem Hex-Input im Custom-Color-Picker-Panel. Gedimmt solange der "Auto"-Schalter aktiv ist. |
| `autoTextColorLabel` | `"Auto"` | Label neben dem Schalter, der zwischen automatischer (WCAG-Kontrast-basierter) und manueller Textfarbe umschaltet. |
| `confirmCreateLabel` | `"Confirm new tag"` | `aria-label` des Häkchen-Icon-Buttons, der beim Anlegen eines neuen Tags angezeigt wird (`allowCreate={true}`). |
| `cancelCreateLabel` | `"Cancel new tag"` | `aria-label` des Schließen-Icon-Buttons, der beim Anlegen eines neuen Tags angezeigt wird (`allowCreate={true}`). |

**Vollständige deutsche Übersetzung:**

```tsx
<TagSelection
  tags={tags}
  translation={{
    selectedTagsLabel:   'Ausgewählte Tags',
    autoCompleteLabel:   'Tags suchen und hinzufügen',
    noSelectedTagsText:  'Keine Tags ausgewählt.',
    noAvailableTagsText: 'Keine Tags verfügbar.',
    placeholder:         'Suchen...',
    loadingText:         'Wird geladen...',
    maxTagsReachedText:  'Maximale Anzahl an Tags erreicht.',
    colorPickerLabel:    'Eigene Farbe',
    backgroundColorLabel: 'Hintergrundfarbe',
    textColorLabel:      'Textfarbe',
    autoTextColorLabel:  'Automatisch',
    confirmCreateLabel:  'Neuen Tag bestätigen',
    cancelCreateLabel:   'Neuen Tag abbrechen',
  }}
/>
```

---

## Anwendungsbeispiele

### Kompakte Variante (klein, ohne Label)

```tsx
<TagSelection
  tags={tags}
  inputSize="small"
  chipSize="small"
  showSelectedTagsLabel={false}
  onTagsChange={(selected) => console.log(selected)}
/>
```

### Nur Anzeige (keine Bearbeitung möglich)

```tsx
// Zeigt ausgewählte Tags ohne Eingabefeld (reine Anzeige, kein Hinzufügen möglich).
<TagSelection
  tags={tags}
  showAutoComplete={false}
/>
```

### Asynchrones Laden von Tags

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchAvailableTags().then((result) => {
    setTags(result);
    setLoading(false);
  });
}, []);

<TagSelection
  tags={tags}
  loading={loading}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

### Serverseitige Filterung

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>([]);
const [loading, setLoading] = useState(false);

const handleSearchChange = async (query: string) => {
  setLoading(true);
  const results = await api.searchTags(query);
  setTags(results);
  setLoading(false);
};

<TagSelection
  tags={tags}
  loading={loading}
  onSearchChange={handleSearchChange}
/>
```

### Tag-Limit mit Hinweistext

```tsx
<TagSelection
  tags={tags}
  maxTags={3}
  translation={{ maxTagsReachedText: 'Maximal 3 Tags erlaubt.' }}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

### Neue Tags erstellen (Creatable Mode)

Wenn `allowCreate={true}` und der Suchbegriff keinem bestehenden Tag entspricht, wechselt
die Komponente in den Create-Mode: CheckIcon (bestätigen) und CloseIcon (abbrechen) erscheinen
im Eingabefeld, darunter eine Farb-Zeile — 7 semantische Theme-Farb-Chips, plus ein
Regenbogen-Chip, der ein Custom-Color-Picker-Panel öffnet (Hintergrundfarbe + Textfarbe, mit
Hex-Eingaben und "Auto"-Kontrast-Umschalter). Der Tag kann per Klick auf das CheckIcon
**oder mit der Enter-Taste** bestätigt werden.

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>(initialTags);

<TagSelection
  tags={tags}
  allowCreate={true}
  onTagCreate={(tag) => {
    // tag hat bereits selected: true und die vom User gewählte(n) Farbe(n)
    setTags((prev) => [...prev, tag]);
  }}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

Hat der User eine Theme-Farbe gewählt, ist `tag.color` gesetzt (z.B. `"primary"`). Hat der
User eine eigene Farbe über den Regenbogen-Chip gewählt, sind stattdessen
`tag.backgroundColor`/`tag.foregroundColor` gesetzt und `tag.color` ist `"default"`.

### Overflow-Chips begrenzen

Wenn die Komponente in einem platzbegrenzten Bereich eingesetzt wird, verhindert `maxVisibleChips` dass der Chip-Bereich unbegrenzt wächst. Überzählige Chips werden hinter einem `+N`-Chip verborgen und in einem Popover angezeigt:

```tsx
<TagSelection
  tags={tags}
  maxVisibleChips={3}
  popoverPlacement="bottom"
  listboxMaxHeight={250}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

Der Popover öffnet sich beim Klick auf `+N` und schließt sich automatisch, sobald alle Overflow-Chips gelöscht wurden.

### Branding-Farben (Custom Colors)

```tsx
const brandedTags: TagSelectionItem[] = [
  { id: 'premium',  label: 'Premium',  selected: true, foregroundColor: '#ffffff', backgroundColor: '#6200ea' },
  { id: 'highlight', label: 'Highlight', selected: true, foregroundColor: '#1a1a1a', backgroundColor: '#ffea00' },
];

<TagSelection tags={brandedTags} />
```

### Integration mit React Hook Form

```tsx
import { Controller } from 'react-hook-form';

<Controller
  name="tags"
  control={control}
  render={({ field }) => (
    <TagSelection
      tags={allTags.map((tag) => ({
        ...tag,
        selected: (field.value as string[]).includes(tag.id),
      }))}
      onTagsChange={(selectedTags) => {
        field.onChange(selectedTags.map((t) => t.id));
      }}
    />
  )}
/>
```

### Deaktivierter Zustand (z. B. während Formular-Submit)

```tsx
const [submitting, setSubmitting] = useState(false);

<TagSelection
  tags={tags}
  disabled={submitting}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

---

## Barrierefreiheit

- Das Autocomplete-Eingabefeld hat ein Label, das als `aria-label` für Screenreader dient. Das Label ist über `translation.autoCompleteLabel` lokalisierbar.
- Alle Chips folgen dem MUI-Standard mit `role="button"` und vollständiger Tastatursteuerung (Enter / Space zum Aktivieren, Delete/Backspace zum Entfernen).
- Die Dropdown-Liste ist über Pfeiltasten navigierbar (MUI Autocomplete-Standard).
- Deaktivierte Tags (`disabled: true`) werden für Screenreader als nicht interaktiv markiert.
- Im `disabled`-Zustand der Komponente werden alle interaktiven Elemente mit `aria-disabled` versehen.

---

## Hinweise und bekannte Einschränkungen

| Thema | Hinweis |
|---|---|
| **Externer State erforderlich** | Die Komponente verwaltet ihren internen Auswahlzustand selbst (via Zustand-Store). Gleichzeitig spiegelt sie alle Änderungen über Callbacks nach oben. Für persistente Datenspeicherung immer `onTagsChange` oder `onTagSelect`/`onTagDelete` verwenden und den State im übergeordneten Komponent halten. |
| **`onTagCreate` und externer State** | Der neue Tag wird intern sofort als selektiert markiert und `onTagCreate` wird mit dem vollständigen `TagSelectionItem` ausgelöst (bereits inkl. `selected: true` und der gewählten `color`/`backgroundColor`/`foregroundColor`) — direkt in den eigenen `tags`-State übernehmen. Die Komponente entscheidet nicht ob ein neuer Tag valide ist — API-Validierung oder andere Checks sind Aufgabe des `onTagCreate`-Handlers. |
| **`loading` ohne Optionen** | Der `loadingText` ist nur sichtbar wenn das Autocomplete geöffnet ist **und** das `tags`-Array keine verfügbaren (nicht-ausgewählten, nicht-deaktivierten) Tags enthält. Mit verfügbaren Tags zeigt MUI Autocomplete diese und nicht den Ladetext. |
| **`color` vs. Custom Colors** | `color` und `foregroundColor`/`backgroundColor` schließen sich gegenseitig aus. Wenn Custom Colors gesetzt sind, wird `color` vollständig ignoriert — auch für den Dark-Mode-Kontrast. |
| **`maxTags` und Deaktivierung** | Wenn `maxTags` erreicht ist, werden bestehende Chips **nicht** deaktiviert — der Nutzer kann Tags entfernen um wieder Platz zu schaffen. Nur das Hinzufügen neuer Tags wird gesperrt. |
| **Sortierung der ausgewählten Tags** | Ausgewählte Tags werden im Chip-Bereich immer **alphabetisch aufsteigend** sortiert angezeigt — unabhängig von der Reihenfolge im `tags`-Array oder der Reihenfolge in der sie ausgewählt wurden. |
| **Sortierung der verfügbaren Tags** | Die Autocomplete-Dropdown-Liste zeigt verfügbare Tags ebenfalls **alphabetisch aufsteigend** sortiert — unabhängig von der Reihenfolge im `tags`-Array. |
| **Suchergebnis-Highlighting** | Während der Nutzer tippt, wird der übereinstimmende Teil jedes Tag-Labels im Dropdown **fett** dargestellt. Die Übereinstimmung ist case-insensitiv; nur das erste Vorkommen pro Label wird hervorgehoben. |
| **Overflow-Popover und `disabled`** | Im `disabled`-Zustand werden Chips im Overflow-Popover ohne Lösch-Icon angezeigt. Der `+N`-Chip selbst bleibt klickbar (nur Ansicht, kein Löschen möglich). |
