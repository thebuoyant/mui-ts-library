# JsonEditor — User Manual

> [Deutsche Version →](JsonEditor.de.md)

**Real-time JSON validation with inline error markers, Format and Compact buttons, and an optional minimap — all in the familiar MUI Paper layout.** Use `JsonEditor` in configuration panels, API explorers, and developer tools where users need to view, edit, or validate JSON.

## Overview

`JsonEditor` is a full-featured JSON code editor built on [CodeMirror 6](https://codemirror.net/) and Material UI. It provides real-time JSON validation with inline error markers, Format (pretty-print) and Compact (minify) buttons, and a validation status indicator in the footer — all wrapped in the same MUI Paper layout as `SqlEditor`.

### What does this component do?

The user sees an MUI Paper card with two zones:

- **Toolbar** (top): Format JSON (pretty-print), Compact (minify), Copy, Clear, Undo/Redo.
- **Editor area**: a CodeMirror JSON editor with:
  - **Syntax highlighting**: property names in the primary color (bold), strings in green, numbers in yellow, booleans in info-blue, `null` in gray — all from your MUI theme.
  - **Line numbers** and optional **fold arrows** (▾/▸) next to `{` and `[` to collapse/expand objects and arrays.
  - **Wavy underlines** for syntax errors (e.g. missing comma, trailing comma, unclosed brace) — red underline, hover for the error message.
  - **`Ctrl / Cmd ⌘+Click`** on any value or property key copies its full JSON path to the clipboard (e.g. `$.users[0].address.city`).
- **Footer** (optional): cursor position + "Valid JSON" / "Invalid JSON" indicator.

> **Compared to `SqlEditor`:** JsonEditor validates structure continuously — you get immediate visual feedback on invalid JSON without writing any linting code.

**Typical use cases:**

- API configuration panels in admin dashboards
- JSON payload editors in developer tools
- Config file editors in settings screens
- Request body editors in REST API explorers
- Debug views that allow in-place JSON editing

---

> ### New in v3.7.0
>
> | Feature | Description | Jump to |
> |---|---|---|
> | **`enablePathFinder`** | `Ctrl/Cmd+Click` a value or key to copy its full JSON path | [→ JSON Path Finder](#json-path-finder) |
> | **`showFolding`** | Collapse/expand objects and arrays inline | [→ Folding](#folding) |
> | **`schema`** | Structural validation (type, required, enum) with inline error diagnostics | [→ Schema Validation](#schema-validation) |

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
import { useState } from 'react';
import { JsonEditor } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  const [json, setJson] = useState('{\n  "name": "Alice",\n  "age": 30\n}');

  return (
    <JsonEditor
      value={json}              // controlled: you own the JSON string
      onChange={setJson}         // called on every change
      showValidation             // shows "Valid JSON" / "Invalid JSON" in the footer
      onValidChange={(isValid) => console.log('Valid:', isValid)} // fires when validity changes
      // Toolbar: Format, Compact, Copy, Clear, Undo/Redo — all on by default
      // Ctrl/Cmd+Click any value → copies its JSON path to clipboard
    />
  );
}
```

> **Minimal version** (no controlled state, no validation): `<JsonEditor onChange={(json) => console.log(json)} />` — a plain editor with toolbar and syntax highlighting. Add `showValidation`, `schema`, `onValidChange` as you need them.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disables editor and toolbar completely |
| `enablePathFinder` | `boolean` | `true` | Enables `Ctrl / Cmd ⌘+Click` on a value or property key to copy its JSON path to the clipboard |
| `error` | `boolean` | `false` | Red border in error state |
| `height` | `number \| string` | `300` | Total height (toolbar + content). Numbers → px. `"auto"` → fills surrounding flex container. |
| `helperText` | `string` | — | Helper text below the editor (like MUI TextField) |
| `highlightColors` | `JsonEditorHighlightColors` | — | Override syntax highlight colors |
| `indent` | `number` | `2` | Number of spaces used by the Format button |
| `name` | `string` | — | Name for native form submission via hidden `<input type="hidden">` |
| `placeholder` | `string` | — | Placeholder text shown when the editor is empty |
| `readonly` | `boolean` | `false` | Read-only mode — no toolbar |
| `schema` | `JsonEditorSchema` | — | Structurally validates the document — see [Schema Validation](#schema-validation) |
| `showFolding` | `boolean` | `true` | Shows a fold gutter — click the ▾/▸ arrows to collapse/expand objects and arrays |
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
| `onPathCopy` | `(path: string) => void` | — | Called after `Ctrl / Cmd ⌘+Click` successfully copies a path via the path finder |
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

### `JsonEditorSchema`

```ts
type JsonSchemaType = "string" | "number" | "integer" | "boolean" | "object" | "array" | "null";

type JsonEditorSchema = {
  type?:       JsonSchemaType | JsonSchemaType[];
  properties?: Record<string, JsonEditorSchema>;
  required?:   string[];
  items?:      JsonEditorSchema;
  enum?:       unknown[];
};
```

A focused subset of JSON Schema — not a full implementation (no `$ref`, `oneOf`/`anyOf`, `pattern`, `minimum`/`maximum`, etc.). See [Schema Validation](#schema-validation) below.

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

### Schema Validation

```tsx
import type { JsonEditorSchema } from '@thebuoyant-tsdev/mui-ts-library';

const userSchema: JsonEditorSchema = {
  type: 'object',
  required: ['name', 'age'],
  properties: {
    name: { type: 'string' },
    age:  { type: 'number' },
    role: { enum: ['admin', 'member', 'viewer'] },
  },
};

<JsonEditor value={json} schema={userSchema} />
```

The `schema` prop structurally validates the document against a **focused subset of JSON Schema** — `type`, `required`, `enum`, and nested `properties`/`items`. Violations show as inline error diagnostics, exactly like syntax errors (red squiggly underline + lint gutter marker; hover for the message).

Schema validation is **skipped while the document doesn't parse as valid JSON** — the built-in parse linter already reports that, and there is no meaningful structure to validate against yet.

```tsx
// Array items are validated against `items`
const listSchema: JsonEditorSchema = {
  type: 'array',
  items: { type: 'object', required: ['id'] },
};

// Multiple allowed types
const nullableSchema: JsonEditorSchema = { type: ['string', 'null'] };
```

This is **not a full JSON Schema implementation** — there's no `$ref`, `oneOf`/`anyOf`, `pattern`, `minimum`/`maximum`, or format validators. It covers the cases named in most real-world config/API validation: is this the right shape, are the required fields present, and is this value one of the allowed options.

---

## Folding

```tsx
{/* Fold gutter shown by default */}
<JsonEditor value={json} />

{/* Hide the fold gutter */}
<JsonEditor value={json} showFolding={false} />
```

Click the ▾/▸ arrow next to any `{` or `[` to collapse that object or array inline — the collapsed region shows a small placeholder you can click again to expand. Especially useful for large, deeply nested documents (API responses, config files). Folding state is managed entirely by CodeMirror — no extra props needed beyond `showFolding`.

---

## JSON Path Finder

```tsx
<JsonEditor
  value={json}
  enablePathFinder
  onPathCopy={(path) => console.log('Copied:', path)}
/>
```

`Ctrl+Click` (Windows/Linux) or `Cmd ⌘+Click` (macOS) on any value or property key copies its full JSON path to the clipboard — e.g. `$.users[0].address.city` — and shows a brief "Copied: …" confirmation bubble near the click. Clicking the key or the value of the same property produces the same path.

Enabled by default (`enablePathFinder={true}`); set it to `false` to disable. Use `onPathCopy` to integrate with your own UI (toast notification, history list, etc.) instead of relying on the built-in bubble.

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

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Typing / editing JSON content | `onChange` · `onValidChange` (when validity changes) |
> | Toolbar: Format or Compact button | `onChange` · `onValidChange` (when validity changes) |
> | Editor gains focus | `onFocus` |
> | Editor loses focus | `onBlur` |
>
> **Note on `onValidChange`:** This callback fires only when validity **changes** — not on every keystroke. It fires once when valid JSON becomes invalid (and vice versa).

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onChange` | `(json: string) => void` | Every content change (typing, paste, format, toolbar) | Controlled mode state sync |
| `onValidChange` | `(isValid: boolean) => void` | JSON validity transitions (valid → invalid or invalid → valid) | Enabling/disabling submit button, showing validation badge |
| `onFocus` | `() => void` | Editor gains keyboard focus | Visual feedback, conditional UI |
| `onBlur` | `() => void` | Editor loses keyboard focus | Triggering validation, auto-save |

### Persisting to a backend — debouncing `onChange`

`onChange` fires on **every content change** (keystroke, paste, format). For local state this is the desired behavior. When persisting to a backend (e.g. auto-saving configuration JSON), debounce the backend call:

```tsx
import { useCallback, useRef } from "react";

function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), ms);
  }, [fn, ms]) as T;
}

function MyJsonEditor() {
  const [json, setJson] = useState('{"key": "value"}');

  const saveToBackend = useDebounce((value: string) => {
    api.saveConfig(value);
  }, 500);

  return (
    <JsonEditor
      value={json}
      onChange={(value) => {
        setJson(value);          // instant — for controlled state
        saveToBackend(value);    // debounced — for backend
      }}
    />
  );
}
```

> **Note:** `onValidChange` fires only when validity transitions (not on every keystroke), so it does not need debouncing.

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
| `ApiResponseViewer` | Read-only REST API response inspector |
| `WebhookPayloadInspector` | Stripe-style webhook event payload with validation |
| `WithFolding` | Large dataset demonstrating the fold gutter |
| `WithPathFinder` | `Ctrl+Click` any value to copy its JSON path |
| `WithSchemaValidation` | Pre-filled with a schema violation (missing field + invalid enum value) |

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
| **Folding implementation** | `@codemirror/lang-json` already marks `Object`/`Array` nodes as foldable (`foldNodeProp`) — `showFolding` just adds `foldGutter()` + `foldKeymap`, no custom fold logic needed |
| **Path Finder implementation** | Walks the Lezer JSON syntax tree from the clicked position up to the root, reading `PropertyName` text and counting `Array` siblings — no JSON re-parsing needed. `posAtCoords` is wrapped in try/catch since it can throw if the click lands before layout has settled |
| **Schema validation error → source range** | Errors are computed against the *parsed* value (no position info), then a path-to-range resolver walks the syntax tree back *down* from the root to find the matching node. "Missing required property" errors point at the *enclosing* object, since the missing key has no range of its own |
| **No JSON Schema dependency** | The validator is a small, focused implementation covering `type`/`required`/`enum`/nested shapes — deliberately not a full JSON Schema implementation (no `ajv` or similar), to keep `JsonEditor`'s bundle size predictable |
