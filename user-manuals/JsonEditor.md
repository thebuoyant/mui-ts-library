# JsonEditor — User Manual

> [Deutsche Version →](JsonEditor.de.md)

## Overview

`JsonEditor` is a full-featured JSON code editor built on [CodeMirror 6](https://codemirror.net/) and Material UI. It provides real-time JSON validation with inline error markers, Format (pretty-print) and Compact (minify) buttons, and a validation status indicator in the footer — all wrapped in the same MUI Paper layout as `SqlEditor`.

**Typical use cases:**

- API configuration panels in admin dashboards
- JSON payload editors in developer tools
- Config file editors in settings screens
- Request body editors in REST API explorers
- Debug views that allow in-place JSON editing

---

> ### ✨ New in v1.5.0
>
> | Feature | Description | Jump to |
> |---|---|---|
> | **`showMinimap`** | Bird's-eye minimap panel for fast navigation in large documents | [→ Minimap](#minimap) |

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@codemirror/lang-json` | 6.x |

---

## Import

```tsx
import {
  JsonEditor,
  DEFAULT_JSON_EDITOR_TRANSLATION,
  DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG,
} from '@thebuoyant-tsdev/mui-ts-library';
import type {
  JsonEditorProps,
  JsonEditorToolbarConfig,
  JsonEditorTranslation,
  JsonEditorHighlightColors,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <JsonEditor
      placeholder="Enter JSON…"
      showValidation
      onChange={(json) => console.log(json)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disables editor and toolbar completely |
| `error` | `boolean` | `false` | Red border in error state |
| `height` | `number \| string` | `300` | Total height (toolbar + content). Numbers → px. `"auto"` → fills surrounding flex container. |
| `helperText` | `string` | — | Helper text below the editor (like MUI TextField) |
| `highlightColors` | `JsonEditorHighlightColors` | — | Override syntax highlight colors |
| `indent` | `number` | `2` | Number of spaces used by the Format button |
| `name` | `string` | — | Name for native form submission via hidden `<input type="hidden">` |
| `placeholder` | `string` | — | Placeholder text shown when the editor is empty |
| `readonly` | `boolean` | `false` | Read-only mode — no toolbar |
| `showLineColumn` | `boolean` | `true` | Show cursor position in footer (Ln / Col) |
| `showLineNumbers` | `boolean` | `true` | Show line number gutter |
| `showMinimap` | `boolean` | `false` | Shows a scaled-down document overview (minimap) on the right side of the editor. Useful for navigating large JSON files. |
| `showValidation` | `boolean` | `false` | Show "Valid JSON" / "Invalid JSON" indicator in footer |
| `toolbarConfig` | `JsonEditorToolbarConfig` | all `true` | Show/hide individual toolbar buttons |
| `translation` | `Partial<JsonEditorTranslation>` | — | Override toolbar tooltips and footer labels |
| `value` | `string` | — | Controlled value — the JSON string displayed in the editor |
| `width` | `number \| string` | `"100%"` | Width. Numbers → px. Empty or unset → 100% of parent. |
| `onBlur` | `() => void` | — | Called when the editor loses focus |
| `onChange` | `(json: string) => void` | — | Called on every content change |
| `onFocus` | `() => void` | — | Called when the editor gains focus |
| `onValidChange` | `(isValid: boolean) => void` | — | Called whenever JSON validity changes |

---

## TypeScript Types

### `JsonEditorToolbarConfig`

```ts
type JsonEditorToolbarConfig = {
  showFormat?:   boolean;
  showCompact?:  boolean;
  showCopy?:     boolean;
  showClear?:    boolean;
  showUndoRedo?: boolean;
};
```

Default configuration (all `true`):

```tsx
import { DEFAULT_JSON_EDITOR_TOOLBAR_CONFIG } from '@thebuoyant-tsdev/mui-ts-library';
```

### `JsonEditorTranslation`

```ts
type JsonEditorTranslation = {
  format:      string;   // "Format JSON"
  compact:     string;   // "Compact JSON"
  copy:        string;   // "Copy"
  copySuccess: string;   // "Copied!"
  clear:       string;   // "Clear"
  undo:        string;   // "Undo"
  redo:        string;   // "Redo"
  lineColumn:  string;   // "Ln {line}, Col {col}"
  validJson:   string;   // "Valid JSON"
  invalidJson: string;   // "Invalid JSON"
};
```

English defaults:

```tsx
import { DEFAULT_JSON_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
```

### `JsonEditorHighlightColors`

```ts
type JsonEditorHighlightColors = {
  propertyName?: string;   // Default: theme primary.main (bold)
  string?:       string;   // Default: theme success.main
  number?:       string;   // Default: theme warning.main
  boolean?:      string;   // Default: theme info.main
  null?:         string;   // Default: theme text.secondary
};
```

---

## Validation

### Built-in Linting

`JsonEditor` uses CodeMirror's `jsonParseLinter` internally — no configuration needed. Syntax errors appear as wavy underlines and lint gutter markers in real time.

### Validation Status Indicator

```tsx
{/* Show "Valid JSON" / "Invalid JSON" in the footer */}
<JsonEditor value={json} showValidation />
```

The indicator is color-coded: green (`success.main`) for valid, red (`error.main`) for invalid.

### `onValidChange` Callback

```tsx
<JsonEditor
  value={json}
  onValidChange={(isValid) => {
    setCanSubmit(isValid);
  }}
/>
```

Fires on every content change whenever validity transitions between `true` and `false`.

---

## Format and Compact

```tsx
{/* Format button pretty-prints with 2-space indent (default) */}
<JsonEditor value='{"name":"Alice","age":30}' />

{/* Custom indentation */}
<JsonEditor value={json} indent={4} />
```

The **Compact** button minifies JSON to a single line. Both buttons are no-ops if the current content is not valid JSON.

---

## Controlled Mode

```tsx
const [json, setJson] = useState('{"name":"Alice"}');

<JsonEditor
  value={json}
  onChange={setJson}
  showValidation
/>
```

External `value` changes sync into the editor without resetting the cursor position.

---

## Height and Width

```tsx
{/* Default: 300px tall, 100% wide */}
<JsonEditor />

{/* Fixed height — content scrolls vertically */}
<JsonEditor height={500} />

{/* CSS string directly */}
<JsonEditor height="50vh" />

{/* "auto" — editor fills the surrounding flex container */}
<Box sx={{ height: 600, display: "flex", flexDirection: "column" }}>
  <JsonEditor height="auto" />
</Box>

{/* Fixed width */}
<JsonEditor width={800} />
```

**Note on `height="auto"`:** The surrounding container must use `display: flex` and `flex-direction: column`.

---

## Readonly and Disabled

```tsx
{/* No editing, no toolbar — pure display */}
<JsonEditor value={json} readonly showValidation />

{/* Editor grayed out, toolbar disabled */}
<JsonEditor value={json} disabled />
```

---

## Toolbar Configuration

Only Format and Copy, no Compact, Clear, or UndoRedo:

```tsx
<JsonEditor
  toolbarConfig={{
    showFormat:   true,
    showCompact:  false,
    showCopy:     true,
    showClear:    false,
    showUndoRedo: false,
  }}
/>
```

---

## Form Integration

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<{ config: string }>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="config"
        control={control}
        rules={{
          validate: (v) => {
            try { JSON.parse(v); return true; }
            catch { return 'Invalid JSON'; }
          },
        }}
        render={({ field }) => (
          <JsonEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.config}
            helperText={errors.config?.message}
            showValidation
          />
        )}
      />
    </form>
  );
}
```

### Native Form Submission

```tsx
<form action="/submit" method="POST">
  <JsonEditor name="payload" value={json} />
  <button type="submit">Submit</button>
</form>
```

The value is submitted via a hidden `<input type="hidden" name="payload">`.

---

## i18n — Translations

Only provide keys you want to override — all others keep their default value:

```tsx
import { DEFAULT_JSON_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';

const DE_TRANSLATION = {
  format:      "JSON formatieren",
  compact:     "JSON komprimieren",
  copy:        "Kopieren",
  copySuccess: "Kopiert!",
  clear:       "Leeren",
  undo:        "Rückgängig",
  redo:        "Wiederholen",
  lineColumn:  "Zeile {line}, Sp. {col}",
  validJson:   "Gültiges JSON",
  invalidJson: "Ungültiges JSON",
};

<JsonEditor translation={DE_TRANSLATION} showValidation />
```

The merge pattern is `{ ...DEFAULT_JSON_EDITOR_TRANSLATION, ...translation }` — only overridden keys need to be provided.

---

## Custom Highlight Colors

```tsx
import type { JsonEditorHighlightColors } from '@thebuoyant-tsdev/mui-ts-library';

const colors: JsonEditorHighlightColors = {
  propertyName: '#c678dd',   // purple — like One Dark
  string:       '#98c379',   // green
  number:       '#d19a66',   // orange
  boolean:      '#56b6c2',   // teal
  null:         '#abb2bf',   // grey
};

<JsonEditor value={json} highlightColors={colors} />
```

---

## API Callbacks

| Callback | Signature | Trigger |
|---|---|---|
| `onChange` | `(json: string) => void` | Every content change (typing, formatting, paste) |
| `onValidChange` | `(isValid: boolean) => void` | Whenever JSON validity changes |
| `onBlur` | `() => void` | Editor loses focus |
| `onFocus` | `() => void` | Editor gains focus |

---

## Storybook Stories

| Story | Description |
|---|---|
| `Default` | Empty editor with placeholder |
| `WithJson` | Pre-filled with a valid JSON object |
| `WithValidation` | Valid JSON + `showValidation` indicator |
| `InvalidJson` | Invalid JSON + `showValidation` showing error |
| `CompactJson` | Pre-filled with minified JSON |
| `WithFixedHeight` | Large dataset with fixed 200px height |
| `WithAutoHeight` | Editor fills a surrounding flex container |
| `Controlled` | Controlled mode with `showValidation` |
| `IndentFour` | Format with 4-space indentation |
| `ReadOnly` | No toolbar, read-only display |
| `Disabled` | Grayed out, not editable |
| `WithError` | Red border + helper text |
| `NoLineNumbers` | No line numbers or cursor footer |
| `CustomHighlightColors` | One Dark–inspired color scheme |
| `GermanTranslation` | Fully translated toolbar and validation labels |
| `LargeDataset` | 20-item array, 500px height |
| `WithMinimap` | Large dataset with minimap panel enabled |

---

## Minimap

The `showMinimap` prop adds an **80 px wide minimap panel** on the right side of the editor. It renders a condensed bird's-eye view of the entire document and lets users click or drag directly inside the minimap to jump to any position — particularly useful for large JSON files with hundreds of lines.

```tsx
<JsonEditor
  value={largeJson}
  height="500"
  showMinimap
/>
```

The minimap is rendered by [`@replit/codemirror-minimap`](https://www.npmjs.com/package/@replit/codemirror-minimap) (MIT license, 1 transitive dependency). It is opt-in (`showMinimap={false}` by default) — no bundle impact when not used.

---

## Architecture Decisions

| Topic | Decision |
|---|---|
| **`jsonParseLinter`** | Built into `@codemirror/lang-json` — no custom linting required; CodeMirror handles error positions automatically |
| **Validation state in parent** | `isValid` is computed in `JsonEditor` (not in `JsonEditorContent`) via `JSON.parse` on every `onChange` — keeps the content component pure and side-effect-free |
| **Format / Compact are no-ops on invalid JSON** | `try { JSON.parse(...) }` silently leaves the editor unchanged if the content is unparseable |
| **Same layout as SqlEditor** | `Paper` wrapper, `Toolbar` + `Divider` + `Content` + optional `Footer` — consistent with the rest of the library |
| **`normalizeSize()`** | Converts numeric strings (`"300"`) to numbers so MUI appends `px` — enables Storybook text controls |
| **Dark mode** | All colors are sourced from `useTheme()` — responds automatically to MUI theme mode changes |
