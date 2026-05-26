# RichTextEditor — User Manual

> [Deutsche Version →](RichTextEditor.de.md)

## Overview

The `RichTextEditor` is a full-featured WYSIWYG text editor built on [TipTap v3](https://tiptap.dev) and Material UI. It provides a rich input interface for content such as CMS texts, email templates, comments, and description fields — fully integrated with the MUI theme, without any external CSS dependencies.

**Typical use cases:**

- CMS forms and content management
- Description fields in ticketing systems or project management tools
- Email template editors
- Comment fields with formatting options
- Form fields that need more than `<TextField multiline>`

---

## Prerequisites

| Dependency | Minimum version |
|---|---|
| React | 19 |
| TypeScript | 5.x |
| Material UI (`@mui/material`) | 9 |
| `@tiptap/react` | 3.x |
| `@tiptap/starter-kit` | 3.x |
| `@tiptap/extension-placeholder` | 3.x |
| `@tiptap/extension-character-count` | 3.x |
| `@tiptap/extension-text-style` | 3.x |
| `@tiptap/extension-color` | 3.x |
| `@tiptap/extension-highlight` | 3.x |
| `tiptap-markdown` | 0.9.x |

---

## Import

```tsx
import {
  RichTextEditor,
  DEFAULT_RICH_TEXT_EDITOR_TRANSLATION,
  DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
} from '@thebuoyant-tsdev/mui-ts-library';
import type {
  RichTextEditorProps,
  RichTextEditorToolbarConfig,
  RichTextEditorTranslation,
} from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Quick Start

```tsx
import { RichTextEditor } from '@thebuoyant-tsdev/mui-ts-library';

function App() {
  return (
    <RichTextEditor
      placeholder="Start typing here…"
      onChange={(html) => console.log(html)}
    />
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `disabled` | `boolean` | `false` | Disables the editor and toolbar completely |
| `error` | `boolean` | `false` | Red border in error state |
| `height` | `number \| string` | `200` | Total height of the editor (toolbar + content). Numbers → px. `"auto"` → fills the surrounding flex container. Excess content scrolls vertically. |
| `helperText` | `string` | — | Helper text below the editor (like MUI TextField) |
| `maxCharacters` | `number` | — | Maximum character count — input is blocked when reached |
| `name` | `string` | — | Name for native form submission (hidden `<input type="hidden">`) |
| `placeholder` | `string` | — | Placeholder text when the editor is empty |
| `readonly` | `boolean` | `false` | Read-only mode — no toolbar, content not editable |
| `showCharacterCount` | `boolean` | `false` | Shows a character counter at the bottom right |
| `showToolbar` | `boolean` | `true` | Hides the toolbar while keeping the editor editable (unlike `readonly`) |
| `showWordCount` | `boolean` | `false` | Shows a word counter at the bottom right (next to the character counter if both are active) |
| `toolbarConfig` | `RichTextEditorToolbarConfig` | see below | Show/hide individual toolbar buttons |
| `translation` | `Partial<RichTextEditorTranslation>` | — | Override texts for tooltips, dialog, and counter labels |
| `value` | `string` | — | Initial HTML string; enables controlled mode |
| `width` | `number \| string` | `"100%"` | Width of the editor. Numbers → px. Empty or unset → 100% of the parent. |
| `onBlur` | `() => void` | — | Called when the editor loses focus |
| `onChange` | `(value: string) => void` | — | Called on every content change |
| `onFocus` | `() => void` | — | Called when the editor gains focus |

---

## TypeScript Types

### `RichTextEditorToolbarConfig`

```ts
type RichTextEditorToolbarConfig = {
  showBold?:             boolean;
  showItalic?:           boolean;
  showUnderline?:        boolean;
  showStrike?:           boolean;
  showHeading1?:         boolean;
  showHeading2?:         boolean;
  showHeading3?:         boolean;
  showBulletList?:       boolean;
  showOrderedList?:      boolean;
  showBlockquote?:       boolean;
  showCodeBlock?:        boolean;
  showLink?:             boolean;
  showHorizontalRule?:   boolean;
  showTextColor?:        boolean;
  showHighlight?:        boolean;
  showUndoRedo?:         boolean;
  showClearFormat?:      boolean;
  /** Fullscreen button at the far right of the toolbar — opt-in, default false */
  showFullscreenButton?: boolean;
};
```

Default: all formatting buttons `true`, `showFullscreenButton: false`.

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG } from '@thebuoyant-tsdev/mui-ts-library';
```

### `RichTextEditorTranslation`

```ts
type RichTextEditorTranslation = {
  // Toolbar tooltips
  bold:             string;
  italic:           string;
  underline:        string;
  strike:           string;
  heading1:         string;
  heading2:         string;
  heading3:         string;
  bulletList:       string;
  orderedList:      string;
  blockquote:       string;
  codeBlock:        string;
  link:             string;
  horizontalRule:   string;
  textColor:        string;
  removeTextColor:  string;
  highlight:        string;
  removeHighlight:  string;
  undo:             string;
  redo:             string;
  clearFormat:      string;
  // Link dialog
  linkDialogTitle:    string;
  linkDialogUrlLabel: string;
  linkDialogSave:     string;
  linkDialogCancel:   string;
  linkDialogRemove:   string;
  // Character counter ({count} and {max} are replaced at runtime)
  characterCount:    string;
  characterCountMax: string;
  // Word counter ({count} is replaced at runtime)
  wordCount:         string;
  // Fullscreen button tooltips
  fullscreen:        string;
  exitFullscreen:    string;
};
```

English defaults:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
```

---

## Output Format

`onChange` always delivers an HTML string, e.g.:

```html
<h2>Title</h2><p>Text with <strong>bold</strong> and <em>italic</em>.</p>
```

---

## Controlled Mode

```tsx
const [content, setContent] = useState('<p>Initial content</p>');

<RichTextEditor
  value={content}
  onChange={setContent}
/>
```

The editor automatically synchronizes `value` → `editor.setContent()` when the external value changes — without moving the cursor.

---

## Text Color and Highlight

Select text and choose a color from the palette via the **Text Color** (A icon) or **Highlight** (brush icon) toolbar buttons:

```tsx
<RichTextEditor placeholder="Select text, then choose a color…" />
```

Both buttons show a colored indicator line below the icon — the most recently used or cursor-active color. A rainbow swatch in the palette opens a free color picker (native browser picker). The trash button removes the color again.

Both buttons can be individually hidden via `toolbarConfig`:

```tsx
<RichTextEditor
  toolbarConfig={{ showTextColor: false, showHighlight: false }}
/>
```

---

## Configuring the Toolbar

Bold, Italic, and Underline only:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG } from '@thebuoyant-tsdev/mui-ts-library';

<RichTextEditor
  toolbarConfig={{
    ...DEFAULT_RICH_TEXT_EDITOR_TOOLBAR_CONFIG,
    showHeading1: false,
    showHeading2: false,
    showHeading3: false,
    showBulletList: false,
    showOrderedList: false,
    showBlockquote: false,
    showCodeBlock: false,
    showLink: false,
    showHorizontalRule: false,
    showUndoRedo: false,
    showClearFormat: false,
  }}
/>
```

---

## Character Limit

```tsx
{/* Display only, no limit */}
<RichTextEditor showCharacterCount />

{/* Display + limit to 500 characters */}
<RichTextEditor maxCharacters={500} />
```

The counter turns red when the limit is reached.

---

## Word Count

```tsx
{/* Word counter only */}
<RichTextEditor showWordCount />

{/* Word counter + character counter combined */}
<RichTextEditor showWordCount showCharacterCount />
```

The word count is displayed at the bottom right of the editor. When both `showWordCount` and `showCharacterCount` are active, words appear to the left of the character count.

The label uses the `wordCount` translation key (default: `"{count} words"`):

```tsx
<RichTextEditor
  showWordCount
  translation={{ wordCount: "{count} Wörter" }}
/>
```

---

## Fullscreen Mode

```tsx
<RichTextEditor
  toolbarConfig={{ showFullscreenButton: true }}
/>
```

The fullscreen button appears at the far right of the toolbar (separated from the formatting buttons). Clicking it expands the editor to cover the entire viewport (`100vw × 100vh`). A second click restores the original size.

- Uses CSS `position: fixed` — no new dependencies
- `zIndex: 1300` (above MUI dialogs)
- The button tooltip switches between `fullscreen` and `exitFullscreen` translation keys
- All other toolbar functions, word count, and character count remain active in fullscreen mode

Customise the tooltip labels:

```tsx
<RichTextEditor
  toolbarConfig={{ showFullscreenButton: true }}
  translation={{
    fullscreen:     "Vollbild",
    exitFullscreen: "Vollbild beenden",
  }}
/>
```

---

## Height and Width

The total size of the editor (toolbar + content area) is controlled via `height` and `width`. Numeric values are automatically converted to `px`; CSS strings like `"50vh"` or `"100%"` are passed through directly.

```tsx
{/* Default: 200px tall, 100% wide */}
<RichTextEditor />

{/* Fixed height — content scrolls vertically when it overflows */}
<RichTextEditor height={400} />

{/* CSS string directly supported */}
<RichTextEditor height="50vh" />

{/* "auto" — editor fills the surrounding flex container */}
<Box sx={{ height: 500, display: "flex", flexDirection: "column" }}>
  <RichTextEditor height="auto" />
</Box>

{/* Fixed width */}
<RichTextEditor width={600} />

{/* Combined */}
<RichTextEditor height={300} width="80%" />
```

**Note on `height="auto"`:** The surrounding container must have `display: flex` and `flex-direction: column` for the editor to align to it.

---

## Markdown Paste

The editor automatically converts pasted Markdown text into rich text. Content copied from `.md` files, GitHub READMEs, or Markdown editors is correctly formatted:

| Markdown syntax | Result |
|---|---|
| `## Heading` | H2 heading |
| `**bold**` / `*italic*` | Bold / Italic |
| `- item` / `1. item` | Bullet list / Numbered list |
| `> quote` | Blockquote |
| `` `code` `` | Inline code |
| `[Text](url)` | Clickable link |

**Note:** This conversion only applies to content from the clipboard (plain-text clipboard). Content copied from rendered sources (e.g. GitHub web view) already carries HTML and is inserted via the normal HTML path.

---

## Readonly and Disabled

```tsx
{/* No editing, no toolbar — pure display */}
<RichTextEditor value={content} readonly />

{/* Editor grayed out, toolbar disabled */}
<RichTextEditor value={content} disabled />
```

---

## Form Integration

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { RichTextEditor } from '@thebuoyant-tsdev/mui-ts-library';

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<{ description: string }>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={!!errors.description}
            helperText={errors.description?.message}
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
  <RichTextEditor name="content" />
  <button type="submit">Submit</button>
</form>
```

The value is submitted via a hidden `<input type="hidden" name="content">` in the form.

---

## i18n — Translations

Only specify deviating keys — all others retain their default value:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';

const DE_TRANSLATION = {
  bold:             "Fett",
  italic:           "Kursiv",
  underline:        "Unterstrichen",
  strike:           "Durchgestrichen",
  heading1:         "Überschrift 1",
  heading2:         "Überschrift 2",
  heading3:         "Überschrift 3",
  bulletList:       "Aufzählung",
  orderedList:      "Nummerierte Liste",
  blockquote:       "Zitat",
  codeBlock:        "Code-Block",
  link:             "Link einfügen",
  horizontalRule:   "Trennlinie",
  textColor:        "Textfarbe",
  removeTextColor:  "Textfarbe entfernen",
  highlight:        "Hervorheben",
  removeHighlight:  "Hervorhebung entfernen",
  undo:             "Rückgängig",
  redo:             "Wiederholen",
  clearFormat:      "Formatierung löschen",
  linkDialogTitle:    "Link einfügen",
  linkDialogUrlLabel: "URL",
  linkDialogSave:     "Speichern",
  linkDialogCancel:   "Abbrechen",
  linkDialogRemove:   "Link entfernen",
  characterCount:    "{count} Zeichen",
  characterCountMax: "{count} / {max} Zeichen",
  wordCount:         "{count} Wörter",
  fullscreen:        "Vollbild",
  exitFullscreen:    "Vollbild beenden",
};

<RichTextEditor translation={DE_TRANSLATION} />
```

The merge pattern is `{ ...DEFAULT_RICH_TEXT_EDITOR_TRANSLATION, ...translation }` — only overridden keys need to be specified.

---

## Error State

```tsx
<RichTextEditor
  error={true}
  helperText="This field is required."
/>
```

The editor border appears in `error.main` (MUI error color), and the `helperText` below is also in red — analogous to MUI `TextField`.

---

## API Callbacks

| Callback | Signature | Trigger |
|---|---|---|
| `onChange` | `(value: string) => void` | Every content change (typing, formatting, pasting) |
| `onBlur` | `() => void` | Editor loses focus |
| `onFocus` | `() => void` | Editor gains focus |

**Important:** `onChange` does NOT fire when `value` is set externally via the prop (external sync via `setContent`). This prevents infinite loops in controlled mode.

---

## Architecture Decisions

| Topic | Decision |
|---|---|
| **No state store** | TipTap `useEditor` manages the editor state internally |
| **No CSS** | Exclusively MUI `sx` prop and `.ProseMirror` selector |
| **TipTap v3** | StarterKit already includes `Link` and `Underline` — no separate imports needed |
| **`shouldRerenderOnTransaction: true`** | Required in TipTap v3 so toolbar buttons reflect their active state |
| **`onMouseDown` preventDefault** | Every toolbar button prevents the editor from losing focus when clicked |
| **`height` on `Paper`** | The total height (toolbar + content) sits on the `Paper` wrapper; the content area fills the rest via `flex: 1` |
| **`normalizeSize()`** | Converts numeric strings (`"300"`) to numbers so MUI appends `px` — enables Storybook text controls |
| **`tiptap-markdown`** | Free community package (`transformPastedText: true`) — no TipTap Pro required |
