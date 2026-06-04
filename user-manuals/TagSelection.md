# TagSelection — User Manual

> [Deutsche Version →](TagSelection.de.md)

**A multi-select input with autocomplete, chip display, and free tag creation — all in one component.** Use `TagSelection` wherever users need to pick from a list or create new labels: filter bars, content tagging, skill selectors, category pickers.

## Overview

The `TagSelection` component is a flexible multi-tag selector built on React and Material UI. It combines a search autocomplete input with a chip-based display of selected tags, and supports async loading, tag limits, free tag creation, and full keyboard navigation.

**Typical use cases:**

- Keyword or category assignment in forms (articles, products, tickets)
- Skill selection in HR or profile management applications
- Filter selection in search masks and dashboard filters
- Tag-based labeling in content management systems

---

## Prerequisites

| Dependency | Minimum version |
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

## Quick Start

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

## Props Reference

### Data structure: `TagSelectionItem`

Each tag is passed as a `TagSelectionItem` object. The entire array (selected, available, and disabled tags) is combined in the `tags` prop.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | **Yes** | Unique tag identifier. Used as a React key and for internal store operations (Select/Delete). Must be unique within the `tags` array. |
| `label` | `string` | **Yes** | Display text of the tag — appears in the chip and in the autocomplete dropdown list. |
| `selected` | `boolean` | No | When `true`, the tag is initially selected and appears in the chip area. Default: `false`. |
| `disabled` | `boolean` | No | When `true`, the tag cannot be selected and does not appear in the autocomplete dropdown list. Already selected tags with `disabled: true` cannot be deleted. |
| `color` | `TagColor` | No | Semantic MUI theme color of the chip: `"default"` · `"primary"` · `"secondary"` · `"error"` · `"info"` · `"success"` · `"warning"`. Recommended approach for dark-mode-compatible coloring, as the colors come from the active MUI theme. |
| `foregroundColor` | `string` | No | Custom text color as a CSS color value (e.g. `"#ffffff"`). Takes precedence over `color`. Escape hatch for brand colors not defined in the MUI theme. |
| `backgroundColor` | `string` | No | Custom background color as a CSS color value. Also used as the border color. Takes precedence over `color`. |

> **Note on color priority:** When `foregroundColor` or `backgroundColor` are set, `color` is completely ignored. The two systems are mutually exclusive.

**TypeScript types:**

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

### Component props: `TagSelectionProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `allowCreate` | `boolean` | `false` | Enables free text input mode. When the user types text that does not match any existing tag, the input switches to create mode: a CheckIcon (confirm) and CloseIcon (cancel) appear in the input, and a color row appears below — 7 semantic theme color chips (dark-mode-compatible) plus a **rainbow circle** that opens the native browser color picker for any hex color. The new tag is immediately marked as selected internally. Confirmation by CheckIcon or **Enter**. |
| `chipSize` | `"small" \| "medium"` | `"small"` | Size of all chips — both in the selection area and in the dropdown list. Should match `inputSize` (`"small"` + `"small"` or `"medium"` + `"medium"`). |
| `disabled` | `boolean` | `false` | Disables the entire component. The autocomplete input is locked; selected chips are grayed out and cannot be deleted. Useful during form submissions or in read-only views. |
| `inputSize` | `"small" \| "medium"` | `"medium"` | Size of the autocomplete input per MUI standard. Affects font size, padding, and input height. |
| `listboxMaxHeight` | `number` | — | Maximum height of the autocomplete dropdown list in pixels. Once the list would be taller, a vertical scrollbar appears. Without this prop, MUI's internal default applies. |
| `loading` | `boolean` | `false` | Shows a loading state in the autocomplete dropdown. Intended for async loading of tags from an API. The loading animation appears when the dropdown is open and the `tags` array is still empty. |
| `maxTags` | `number` | — | Maximum number of simultaneously selectable tags. When the limit is reached, the autocomplete input is automatically disabled and a hint text appears. Removing a selected tag unlocks the field again. |
| `maxVisibleChips` | `number` | — | Maximum number of visible chips in the selection area. Excess chips are hidden behind a `+N` chip. Clicking `+N` opens a popover with the hidden chips — they can also be deleted there. Without this prop, all chips are shown. |
| `popoverPlacement` | `"top" \| "bottom"` | `"bottom"` | Opening direction of the overflow popover (relative to the `+N` chip). Only relevant when `maxVisibleChips` is set. |
| `showAutoComplete` | `boolean` | `true` | Shows the search input field. When `false`, the user cannot add new tags — the chip area remains visible (display only). |
| `showSelectedTags` | `boolean` | `true` | Shows the upper area with selected tags as chips. When `false`, the entire chip area is hidden — the autocomplete remains visible. |
| `showSelectedTagsLabel` | `boolean` | `true` | Shows the label heading above the chip area (default: "Selected tags"). Can be hidden when the context is self-explanatory. |
| `tags` | `TagSelectionItem[]` | — | **Required.** Complete tag array including selected, available, and disabled tags. State changes (Select, Delete, Create) are reflected back via callbacks. |
| `translation` | `Partial<TagSelectionTranslation>` | English defaults | Texts for all displayed labels. Only specify deviating keys — unset keys fall back to the English defaults. See [Translations](#translations). |

---

## Callbacks / Events

| Callback | Signature | When fired |
|---|---|---|
| `onTagSelect` | `(tag: TagSelectionItem, selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | An available tag was selected from the dropdown list. `tag` contains the selected tag with `selected: true`. `selectedTags` is the complete list of now selected tags. `allTags` is the complete tag array including disabled tags. |
| `onTagDelete` | `(tag: TagSelectionItem, selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | The delete icon of a selected chip was clicked. `tag` contains the removed tag with `selected: false`. `selectedTags` is the remaining selection. `allTags` is the complete array after removal. |
| `onTagsChange` | `(selectedTags: TagSelectionItem[], allTags: TagSelectionItem[]) => void` | Called after **every** selection change — both after Select and Delete. Central callback for data-driven architectures. |
| `onSearchChange` | `(searchValue: string) => void` | Called on every change of the search text in the autocomplete field. Useful for server-side filtering or search. |
| `onTagCreate` | `(label: string, color: TagColor, customColors?: { backgroundColor: string; foregroundColor: string }) => void` | Fired when the user confirms a new tag in create mode (`allowCreate={true}`). `label` is the typed text, `color` is the selected MUI theme color. When a custom hex color was picked, `color` is `"default"` and `customColors` contains `backgroundColor` (hex) and `foregroundColor` (auto-contrast black/white). |

> **Important about `onTagCreate`:** The new tag is immediately inserted into the store by the component with `selected: true`. `onTagCreate` is then fired so the caller can synchronize their external state (`tags` prop). **`selected: true` must be set**, otherwise the next re-render will overwrite the internal state:
>
> ```tsx
> onTagCreate={(label, color) => {
>   setTags((prev) => [
>     ...prev,
>     { id: label.toLowerCase().replace(/\s+/g, '-'), label, color, selected: true },
>   ]);
> }}
> ```
>
> When a **custom hex color** is used, `onTagsChange` delivers the full `TagSelectionItem` with `backgroundColor`/`foregroundColor` — recommended for persisting custom-color tags.

---

## Translations {#translations}

All displayed texts can be overridden via the `translation` prop. Only the keys that deviate from the default need to be specified. The English default values can be imported directly:

```ts
import { DEFAULT_TAG_SELECTION_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
import type { TagSelectionTranslation } from '@thebuoyant-tsdev/mui-ts-library';

// Full TypeScript type:
type TagSelectionTranslation = {
  selectedTagsLabel:   string;
  autoCompleteLabel:   string;
  noSelectedTagsText:  string;
  noAvailableTagsText: string;
  placeholder:         string;
  loadingText:         string;
  maxTagsReachedText:  string;
  colorPickerLabel:    string;
};
```

| Key | Default value | Description |
|---|---|---|
| `selectedTagsLabel` | `"Selected tags"` | Heading above the chip area. Only visible when `showSelectedTagsLabel={true}`. |
| `autoCompleteLabel` | `"Search and add tags"` | Label of the autocomplete input field (floating, MUI standard). Also serves as `aria-label` for screen readers. |
| `noSelectedTagsText` | `"No tags selected."` | Hint text in the chip area when no tags are selected yet. |
| `noAvailableTagsText` | `"No tags available."` | Text in the dropdown list when no matching tags are found (filtering or empty list). |
| `placeholder` | `"Type to search..."` | Placeholder text in the autocomplete input field. |
| `loadingText` | `"Loading..."` | Text in the dropdown list during loading (`loading={true}`). |
| `maxTagsReachedText` | `"Maximum number of tags reached."` | Helper text below the input field when the tag limit is reached (`maxTags` set). |
| `colorPickerLabel` | `"Custom color"` | Tooltip for the palette icon button shown in the color row during tag creation (`allowCreate={true}`). |
| `backgroundColorLabel` | `"Background color"` | Heading inside the color picker panel, shown above the color swatches and the live-preview chip. Makes clear that the chosen color is the tag's **background color** (text color is auto-calculated via WCAG contrast). |

**Full German translation:**

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
  }}
/>
```

---

## Usage Examples

### Compact variant (small, without label)

```tsx
<TagSelection
  tags={tags}
  inputSize="small"
  chipSize="small"
  showSelectedTagsLabel={false}
  onTagsChange={(selected) => console.log(selected)}
/>
```

### Display only (no editing)

```tsx
{/* Shows selected tags without an input field (display only, no adding possible). */}
<TagSelection
  tags={tags}
  showAutoComplete={false}
/>
```

### Async tag loading

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

### Server-side filtering

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

### Tag limit with hint text

```tsx
<TagSelection
  tags={tags}
  maxTags={3}
  translation={{ maxTagsReachedText: 'Maximum 3 tags allowed.' }}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

### Creating new tags (Creatable Mode)

When `allowCreate={true}` and the search term does not match any existing tag, the component
switches to create mode: a CheckIcon (confirm) and CloseIcon (cancel) appear in the input,
with 7 theme color chips for color selection below. Confirm by clicking the CheckIcon
**or pressing Enter**.

```tsx
const [tags, setTags] = useState<TagSelectionItem[]>(initialTags);

<TagSelection
  tags={tags}
  allowCreate={true}
  onTagCreate={(label, color) => {
    // selected: true is important — otherwise the next re-render overwrites the internal state
    setTags((prev) => [
      ...prev,
      {
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        color,         // theme color chosen by the user
        selected: true,
      },
    ]);
  }}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

To assign custom hex colors, ignore the `color` argument and set
`backgroundColor`/`foregroundColor` with your own logic:

```tsx
onTagCreate={(label) => {
  setTags((prev) => [
    ...prev,
    {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      selected: true,
      foregroundColor: '#ffffff',
      backgroundColor: computeBrandColor(label), // custom logic
    },
  ]);
}}
```

### Limiting overflow chips

When the component is used in a space-constrained area, `maxVisibleChips` prevents the chip
area from growing indefinitely. Excess chips are hidden behind a `+N` chip and shown in a popover:

```tsx
<TagSelection
  tags={tags}
  maxVisibleChips={3}
  popoverPlacement="bottom"
  listboxMaxHeight={250}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

The popover opens on click of `+N` and closes automatically once all overflow chips have been deleted.

### Brand colors (Custom Colors)

```tsx
const brandedTags: TagSelectionItem[] = [
  { id: 'premium',   label: 'Premium',   selected: true, foregroundColor: '#ffffff', backgroundColor: '#6200ea' },
  { id: 'highlight', label: 'Highlight', selected: true, foregroundColor: '#1a1a1a', backgroundColor: '#ffea00' },
];

<TagSelection tags={brandedTags} />
```

### Integration with React Hook Form

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

### Disabled state (e.g. during form submit)

```tsx
const [submitting, setSubmitting] = useState(false);

<TagSelection
  tags={tags}
  disabled={submitting}
  onTagsChange={(_, allTags) => setTags(allTags)}
/>
```

---

## Accessibility

- The autocomplete input field has a label that serves as `aria-label` for screen readers. The label is localizable via `translation.autoCompleteLabel`.
- All chips follow the MUI standard with `role="button"` and full keyboard navigation (Enter / Space to activate, Delete/Backspace to remove).
- The dropdown list is navigable with arrow keys (MUI Autocomplete standard).
- Disabled tags (`disabled: true`) are marked as non-interactive for screen readers.
- In the `disabled` state of the component, all interactive elements are provided with `aria-disabled`.

---

## Notes and Known Limitations

| Topic | Note |
|---|---|
| **External state required** | The component manages its internal selection state itself (via Zustand store). At the same time, it reflects all changes via callbacks. For persistent data storage, always use `onTagsChange` or `onTagSelect`/`onTagDelete` and hold the state in the parent component. |
| **`onTagCreate` and external state** | The new tag is immediately marked as selected internally. `onTagCreate` serves to synchronize the external `tags` array. Set `selected: true` — otherwise the tag falls out of the selection on the next re-render. The component does not decide whether a new tag is valid — API validation or other checks are the responsibility of the `onTagCreate` handler. |
| **`loading` without options** | The `loadingText` is only visible when the autocomplete is open **and** the `tags` array contains no available (non-selected, non-disabled) tags. With available tags, MUI Autocomplete shows these rather than the loading text. |
| **`color` vs. Custom Colors** | `color` and `foregroundColor`/`backgroundColor` are mutually exclusive. When custom colors are set, `color` is completely ignored — including for dark-mode contrast. |
| **`maxTags` and disabling** | When `maxTags` is reached, existing chips are **not** disabled — the user can remove tags to make room. Only adding new tags is blocked. |
| **Sorting of selected tags** | Selected tags are always displayed in **ascending alphabetical order** in the chip area — regardless of the order in the `tags` array or the order in which they were selected. |
| **Sorting of available tags** | The autocomplete dropdown list also shows available tags in **ascending alphabetical order** — regardless of the order in the `tags` array. |
| **Overflow popover and `disabled`** | In the `disabled` state, chips in the overflow popover are shown without a delete icon. The `+N` chip itself remains clickable (view only, no deleting possible). |
