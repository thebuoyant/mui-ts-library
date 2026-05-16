# TagSelection — Benutzerhandbuch

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
| Material UI (`@mui/material`) | 7 |
| Zustand | 5 |

---

## Import

```tsx
import { TagSelection } from 'mui-ts-library';
import type {
  TagSelectionItem,
  TagSelectionProps,
  TagSelectionTranslation,
  TagColor,
} from 'mui-ts-library';
```

---

## Schnellstart

```tsx
import { TagSelection } from 'mui-ts-library';
import type { TagSelectionItem } from 'mui-ts-library';
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
| `startIcon` | `ReactElement` | Nein | Icon, das vor dem Label im Chip angezeigt wird. Globalgesteuert über `showStartIcon`-Prop. |
| `deleteIcon` | `ReactElement` | Nein | Ersetzt das Standard-Lösch-Icon (✕) des MUI-Chips durch ein eigenes Element. Wenn nicht gesetzt, verwendet MUI sein Standard-Icon sofern `onDelete` übergeben wird. |

> **Hinweis zu Farb-Priorität:** Wenn `foregroundColor` oder `backgroundColor` gesetzt sind, wird `color` komplett ignoriert. Die beiden Systeme schließen sich gegenseitig aus.

---

### Komponenten-Props: `TagSelectionProps`

#### Darstellung & Sichtbarkeit

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `tags` | `TagSelectionItem[]` | — | **Pflichtfeld.** Vollständiges Tag-Array inklusive ausgewählter, verfügbarer und deaktivierter Tags. Zustandsänderungen (Select, Delete, Create) werden über Callbacks nach oben gespiegelt. |
| `showSelectedTags` | `boolean` | `true` | Zeigt den oberen Bereich mit den ausgewählten Tags als Chips an. Wenn `false`, wird der gesamte Chip-Bereich ausgeblendet — die Autocomplete bleibt sichtbar. |
| `showSelectedTagsLabel` | `boolean` | `true` | Zeigt das Label-Heading über dem Chip-Bereich an (Standard: „Selected tags"). Kann versteckt werden wenn der Kontext selbsterklärend ist. |
| `showAutoComplete` | `boolean` | `true` | Zeigt das Such-Eingabefeld an. Wenn `false`, kann der Nutzer keine neuen Tags auswählen — der Chip-Bereich bleibt sichtbar (reine Anzeige). |
| `showStartIcon` | `boolean` | `true` | Globaler Schalter für Start-Icons auf allen Chips — sowohl im Auswahl-Bereich als auch in der Dropdown-Liste. Überschreibt nicht das Vorhandensein von `startIcon` im Tag-Objekt, sondern nur die Sichtbarkeit. |
| `showDeleteIcon` | `boolean` | `true` | Globaler Schalter für Lösch-Icons auf allen ausgewählten Chips. Wenn `false`, können Tags nicht interaktiv entfernt werden. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Größe der Autocomplete-Eingabe gemäß MUI-Standard. Beeinflusst Schriftgröße, Innenabstand und Höhe des Eingabefelds. |
| `chipSize` | `"small" \| "medium"` | `"medium"` | Größe aller Chips — sowohl im Auswahl-Bereich als auch in der Dropdown-Liste. Sollte zur `inputSize` passen (`"small"` + `"small"` oder `"medium"` + `"medium"`). |

#### Zustand & Verhalten

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Deaktiviert die gesamte Komponente. Das Autocomplete-Eingabefeld wird gesperrt; ausgewählte Chips werden grau dargestellt und sind nicht löschbar. Nützlich während Formular-Submissions oder in reinen Lese-Ansichten. |
| `loading` | `boolean` | `false` | Zeigt einen Ladezustand im Autocomplete-Dropdown an. Gedacht für asynchrones Laden von Tags aus einer API. Die Ladeanimation erscheint wenn das Dropdown geöffnet ist und das `tags`-Array noch leer ist. |
| `maxTags` | `number` | — | Maximale Anzahl gleichzeitig auswählbarer Tags. Wenn das Limit erreicht ist, wird das Autocomplete-Eingabefeld automatisch deaktiviert und ein Hinweistext erscheint. Das Entfernen eines ausgewählten Tags entsperrt das Feld wieder. |
| `allowCreate` | `boolean` | `false` | Aktiviert den freien Texteingabe-Modus. Wenn der Nutzer einen Text eintippt, der keinem bestehenden Tag entspricht, erscheint eine „Create '…'"-Option in der Dropdown-Liste. Die Komponente selbst fügt den neuen Tag **nicht** in die Liste ein — das ist Aufgabe des `onTagCreate`-Callbacks. |

#### Übersetzung

| Prop | Typ | Standard | Beschreibung |
|---|---|---|---|
| `translation` | `Partial<TagSelectionTranslation>` | Englische Defaults | Texte für alle angezeigten Beschriftungen. Nur abweichende Keys angeben — nicht gesetzte Keys fallen auf die englischen Standardwerte zurück. Siehe [Texte & Übersetzungen](#texte--übersetzungen). |

---

## Callbacks / Events

| Callback | Signatur | Wann ausgelöst |
|---|---|---|
| `onTagSelect` | `(tag: TagSelectionItem, selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Ein verfügbarer Tag wurde aus der Dropdown-Liste ausgewählt. `tag` enthält den ausgewählten Tag mit `selected: true`. `selectedTags` ist die vollständige Liste der nun ausgewählten Tags. `allTags` ist das vollständige Tag-Array inklusive deaktivierter Tags. |
| `onTagDelete` | `(tag: TagSelectionItem, selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Das Lösch-Icon eines ausgewählten Chips wurde geklickt. `tag` enthält den entfernten Tag mit `selected: false`. `selectedTags` ist die verbleibende Auswahl. `allTags` ist das vollständige Array nach dem Entfernen. |
| `onTagsChange` | `(selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Wird nach **jeder** Änderung der Auswahl aufgerufen — sowohl nach Select als auch nach Delete. Zentraler Callback für datengetriebene Architekturen. |
| `onSearchChange` | `(searchValue: string) => void` | Wird bei jeder Änderung des Suchtexts im Autocomplete-Feld aufgerufen. Nützlich für serverseitige Filterung oder Suche. |
| `onTagCreate` | `(label: string) => void` | Wird ausgelöst wenn der Nutzer eine „Create '…'"-Option auswählt (`allowCreate={true}`). `label` ist der original eingetippte Text (nicht der angezeigte „Create '…'"-String). Der neue Tag muss vom aufrufenden Code zur `tags`-Liste hinzugefügt werden. |

> **Wichtig zu `onTagCreate`:** Die Komponente verwaltet ihren internen Zustand über das `tags`-Prop. Ein neu erstellter Tag erscheint erst dann in der Auswahlliste, wenn er dem `tags`-Array hinzugefügt und als Prop zurückgegeben wird. Die Komponente übernimmt das nicht automatisch.

---

## Texte & Übersetzungen {#texte--übersetzungen}

Alle angezeigten Texte können über die `translation`-Prop überschrieben werden. Es müssen nur die Keys angegeben werden, die vom Standard abweichen.

| Key | Standard-Wert | Beschreibung |
|---|---|---|
| `selectedTagsLabel` | `"Selected tags"` | Überschrift über dem Chip-Bereich. Nur sichtbar wenn `showSelectedTagsLabel={true}`. |
| `autoCompleteLabel` | `"Search and add tags"` | Label des Autocomplete-Eingabefelds (schwebend, MUI-Standard). Dient gleichzeitig als `aria-label` für Screenreader. |
| `noSelectedTagsText` | `"No tags selected."` | Hinweistext im Chip-Bereich wenn noch keine Tags ausgewählt sind. |
| `noAvailableTagsText` | `"No tags available."` | Text in der Dropdown-Liste wenn keine passenden Tags gefunden werden (Filterung oder leere Liste). |
| `placeholder` | `"Type to search..."` | Platzhaltertext im Autocomplete-Eingabefeld. |
| `loadingText` | `"Loading..."` | Text in der Dropdown-Liste während des Ladevorgangs (`loading={true}`). |
| `createTagLabel` | `"Create '{query}'"` | Text der Erstellen-Option in der Dropdown-Liste (`allowCreate={true}`). `{query}` wird zur Laufzeit durch den eingetippten Text ersetzt. |
| `maxTagsReachedText` | `"Maximum number of tags reached."` | Hilfstext unterhalb des Eingabefelds wenn das Tag-Limit erreicht ist (`maxTags` gesetzt). |

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
    createTagLabel:      "'{query}' erstellen",
    maxTagsReachedText:  'Maximale Anzahl an Tags erreicht.',
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
// Zeigt ausgewählte Tags ohne Lösch-Icons und ohne Eingabefeld.
<TagSelection
  tags={tags}
  showAutoComplete={false}
  showDeleteIcon={false}
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

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>(initialTags);

<TagSelection
  tags={tags}
  allowCreate={true}
  onTagCreate={(label) => {
    // Neuen Tag zur Liste hinzufügen
    setTags((prev) => [
      ...prev,
      {
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        selected: true, // direkt als ausgewählt markieren
      },
    ]);
  }}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

### Branding-Farben (Custom Colors)

```tsx
const brandedTags: TagSelectionItem[] = [
  {
    id: 'premium',
    label: 'Premium',
    selected: true,
    foregroundColor: '#ffffff',
    backgroundColor: '#6200ea',
    deleteIcon: <CloseIcon />,
  },
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
- Alle Chips folgen dem MUI-Standard mit `role="button"` und vollständiger Tastatursteuerung (Enter / Space zum Aktivieren, Delete/Backspace zum Entfernen wenn `showDeleteIcon={true}`).
- Die Dropdown-Liste ist über Pfeiltasten navigierbar (MUI Autocomplete-Standard).
- Deaktivierte Tags (`disabled: true`) werden für Screenreader als nicht interaktiv markiert.
- Im `disabled`-Zustand der Komponente werden alle interaktiven Elemente mit `aria-disabled` versehen.

---

## Hinweise und bekannte Einschränkungen

| Thema | Hinweis |
|---|---|
| **Externer State erforderlich** | Die Komponente verwaltet ihren internen Auswahlzustand selbst (via Zustand-Store). Gleichzeitig spiegelt sie alle Änderungen über Callbacks nach oben. Für persistente Datenspeicherung immer `onTagsChange` oder `onTagSelect`/`onTagDelete` verwenden und den State im übergeordneten Komponent halten. |
| **`onTagCreate` ohne automatisches Hinzufügen** | Der erstellte Tag erscheint erst in der Liste wenn er explizit zum `tags`-Array hinzugefügt wird. Die Komponente entscheidet nicht selbst ob ein neuer Tag valid ist — das ist Aufgabe der übergeordneten Logik (z. B. API-Validierung). |
| **`loading` ohne Optionen** | Der `loadingText` ist nur sichtbar wenn das Autocomplete geöffnet ist **und** das `tags`-Array keine verfügbaren (nicht-ausgewählten, nicht-deaktivierten) Tags enthält. Mit verfügbaren Tags zeigt MUI Autocomplete diese und nicht den Ladetext. |
| **`color` vs. Custom Colors** | `color` und `foregroundColor`/`backgroundColor` schließen sich gegenseitig aus. Wenn Custom Colors gesetzt sind, wird `color` vollständig ignoriert — auch für den Dark-Mode-Kontrast. |
| **`maxTags` und Deaktivierung** | Wenn `maxTags` erreicht ist, werden bestehende Chips **nicht** deaktiviert — der Nutzer kann Tags entfernen um wieder Platz zu schaffen. Nur das Hinzufügen neuer Tags wird gesperrt. |
