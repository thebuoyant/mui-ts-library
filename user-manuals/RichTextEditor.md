# RichTextEditor — User Manual

> [Deutsche Version →](RichTextEditor.de.md)

**A drop-in WYSIWYG editor that goes far beyond a `<textarea>` — without any external CSS dependencies.** Use `RichTextEditor` for CMS fields, email templates, comment boxes, description inputs, or any content area where users need formatting, tables, images, and emoji.

## Overview

The `RichTextEditor` is a full-featured WYSIWYG text editor built on [TipTap v3](https://tiptap.dev) and Material UI. It provides a rich input interface for content such as CMS texts, email templates, comments, and description fields — fully integrated with the MUI theme, without any external CSS dependencies.

| New in v3.14.0 | |
|---|---|
| **Mention (@)** | `@`-triggered autocomplete list populated from a consumer-provided item list (`mentionItems`) — with optional async/server-side search (`onMentionSearch`) |

| New in v3.8.0 | |
|---|---|
| **Paste as plain text** | Toolbar toggle that strips formatting from pasted content (`showPasteAsPlainTextButton`) |
| **Markdown import/export** | Dialog to convert between the current content and Markdown, plus a live `onMarkdownChange` callback (`showMarkdownButton`) |

**Typical use cases:**

- CMS forms and content management
- Description fields in ticketing systems or project management tools
- Email template editors
- Comment fields with formatting options
- Form fields that need more than `<TextField multiline>`

### What does this component do?

When you render `RichTextEditor`, the user sees a two-part panel inside a MUI Paper:

**Toolbar (top):** A row of icon buttons — Bold, Italic, Underline, Strike, H1/H2/H3, Bullet list, Numbered list, Blockquote, Code block, Link, Horizontal rule, Text color, Highlight, Undo/Redo, Clear format. Each button has a tooltip. Opt-in buttons (Table, Image, Emoji, Paste-as-plain-text, Markdown, Fullscreen) are hidden by default and enabled via `toolbarConfig`.

**Content area (below the toolbar):** A white (or dark-mode) editable text area. The user types here — what they see while typing is what the output looks like (WYSIWYG). Formatting is applied immediately: selecting text and clicking **B** makes it bold, clicking **H2** turns a paragraph into a heading.

**Footer (optional):** A right-aligned character counter and/or word counter line at the bottom, shown when `showCharacterCount` or `showWordCount` is active.

> **Key concept — output is HTML, not plain text:** Unlike `SqlEditor` or `JsonEditor` which produce SQL/JSON strings, `RichTextEditor` produces an **HTML string** via `onChange`. Store this string in your database and render it later with `dangerouslySetInnerHTML` (or a sanitized rendering library). The produced HTML uses standard tags: `<strong>`, `<em>`, `<h2>`, `<ul>`, `<li>`, `<a>`, etc.

> **Difference from `<TextField multiline>`:** `TextField` gives you plain text. `RichTextEditor` gives you structured HTML with headings, lists, links, tables, images, and more — all without any external CSS files.

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
import { useState } from 'react';

function App() {
  // RichTextEditor produces HTML — store the string in state, then save it to your backend
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      placeholder="Start typing here…"  // shown when the editor is empty
      onChange={(html) => setContent(html)}
      // html = a standard HTML string like '<p>Hello <strong>World</strong></p>'
      // called on every keystroke — use this to keep your state in sync
    />
  );
}
```

> **Minimal version:** `placeholder` is optional; `onChange` is what makes it useful. Without `onChange` the editor works but you can't read what the user typed.

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultValue` | `string` | — | Initial HTML content for uncontrolled usage — set once on mount, never re-synced. No external state required. When both `value` and `defaultValue` are provided, `value` takes precedence. |
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
| `mentionItems` | `MentionItem[]` | — | Item list for `@`-mention autocomplete. The Mention extension is only active when this prop or `onMentionSearch` is set. Used for client-side filtering when `onMentionSearch` is not provided. |
| `mentionTriggerChar` | `string` | `"@"` | Character that opens the mention autocomplete popup |
| `onBlur` | `() => void` | — | Called when the editor loses focus |
| `onChange` | `(value: string) => void` | — | Called on every content change |
| `onFocus` | `() => void` | — | Called when the editor gains focus |
| `onMarkdownChange` | `(markdown: string) => void` | — | Called alongside `onChange` on every content change, with the content as Markdown |
| `onMentionSearch` | `(query: string) => MentionItem[] \| Promise<MentionItem[]>` | — | Custom search/filter function for mentions. When provided, `mentionItems` is ignored for filtering — return the matching subset (supports async for server-side search) |
| `onSave` | `() => void` | — | Called when the user presses **Ctrl+S** (Windows/Linux) or **Cmd+S** (macOS). The browser's "Save Page" dialog is always suppressed inside the editor. |

---

## TypeScript Types

### `MentionItem`

```ts
type MentionItem = {
  id: string;    // unique identifier stored as data-id in the HTML output
  label: string; // display name shown in the dropdown and in the editor
};
```

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
  /** Table insert + row/column management — opt-in, default false */
  showTableButton?:      boolean;
  /** Image insert dialog (URL or Base64) — opt-in, default false */
  showImageButton?:      boolean;
  /** Emoji picker popover — opt-in, default false */
  showEmojiButton?:      boolean;
  /** Toggle that strips formatting from pasted content — opt-in, default false */
  showPasteAsPlainTextButton?: boolean;
  /** Markdown import/export dialog — opt-in, default false */
  showMarkdownButton?:   boolean;
};
```

Default: all formatting buttons `true`, all opt-in buttons (`showFullscreenButton`, `showTableButton`, `showImageButton`, `showEmojiButton`, `showPasteAsPlainTextButton`, `showMarkdownButton`) `false`.

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
  // Table toolbar (showTableButton)
  table:             string;
  insertTable:       string;
  addRowBefore:      string;
  addRowAfter:       string;
  deleteRow:         string;
  addColumnBefore:   string;
  addColumnAfter:    string;
  deleteColumn:      string;
  deleteTable:       string;
  // Image dialog (showImageButton)
  image:             string;
  imageDialogTitle:  string;
  imageDialogUrlLabel: string;
  imageDialogAltLabel: string;
  imageDialogSave:   string;
  imageDialogCancel: string;
  // Emoji picker (showEmojiButton)
  emoji:                  string;
  emojiSearchPlaceholder: string;
  // Paste as plain text (showPasteAsPlainTextButton) — optional, see compatibility note below
  pasteAsPlainText?:        string;
  pasteAsHtml?:             string;
  // Markdown dialog (showMarkdownButton) — optional, see compatibility note below
  markdown?:                string;
  markdownDialogTitle?:       string;
  markdownDialogDescription?: string;
  markdownDialogApply?:       string;
  markdownDialogCancel?:      string;
  markdownDialogCopy?:        string;
  markdownDialogCopied?:      string;
  // Mention dropdown (mentionItems / onMentionSearch) — optional, see compatibility note below
  mentionNoResults?:          string;
};
```

English defaults:

```tsx
import { DEFAULT_RICH_TEXT_EDITOR_TRANSLATION } from '@thebuoyant-tsdev/mui-ts-library';
```

> **⚠️ Compatibility note:** the 9 keys above (8 added in `v3.8.0`, 1 in `v3.14.0`) are optional on this type — unlike the other keys, which are required. This is intentional: it lets older code that declares a full `RichTextEditorTranslation` literal (instead of passing a partial object to the `translation` prop) keep compiling without changes when we add new keys in the future. Internally, the component always resolves missing keys against `DEFAULT_RICH_TEXT_EDITOR_TRANSLATION`, so you never need to provide them.

---

## Output Format

`onChange` always delivers an HTML string, e.g.:

```html
<h2>Title</h2><p>Text with <strong>bold</strong> and <em>italic</em>.</p>
```

When mentions are active, each inserted mention is serialised as a `<span>` with data attributes:

```html
<p>Hello <span class="rte-mention" data-type="mention" data-id="alice" data-label="Alice Johnson">@Alice Johnson</span>!</p>
```

Your backend can parse `data-id` to resolve the referenced user/entity.

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

## Tables

Enable the table toolbar button via `showTableButton`:

```tsx
<RichTextEditor
  toolbarConfig={{ showTableButton: true }}
/>
```

Click the table icon → **"Insert 3×3 table"** to insert a table with a header row. Click anywhere inside the table and open the menu again to manage structure:

| Menu action | Description |
|---|---|
| Insert 3×3 table | Always available — inserts a new table |
| Add row before / after | Inserts a row relative to the current cursor row |
| Delete row | Removes the current row |
| Add column before / after | Inserts a column relative to the current cursor column |
| Delete column | Removes the current column |
| Delete table | Removes the entire table |

---

## Image Embed

Enable the image toolbar button via `showImageButton`:

```tsx
<RichTextEditor
  toolbarConfig={{ showImageButton: true }}
/>
```

Click the image icon to open a dialog. Enter an **Image URL** (any public `https://` URL or a Base64 data URL) and an optional **Alt text**. The image is inserted inline and displayed with `max-width: 100%`.

---

## Emoji Picker

Enable the emoji picker via `showEmojiButton`:

```tsx
<RichTextEditor
  toolbarConfig={{ showEmojiButton: true }}
/>
```

Click the smiley icon to open a popover with ~200 curated emojis in 6 categories: Smileys, Gestures, Hearts & Symbols, Nature, Food, Objects & Travel. Use the search field to filter by name. Clicking an emoji inserts it at the current cursor position. No external dependency.

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

## Paste as Plain Text

Enable the toggle via `showPasteAsPlainTextButton`:

```tsx
<RichTextEditor
  toolbarConfig={{ showPasteAsPlainTextButton: true }}
/>
```

Click the clipboard icon to activate it (the icon and tooltip switch to indicate the active state). While active, **any** pasted content — formatted HTML from a website, a Word document, another rich text editor — is stripped of all formatting and inserted as plain text. This also overrides the [Markdown Paste](#markdown-paste) auto-conversion described above, since plain-text paste takes precedence while the toggle is on. Click the icon again to return to normal paste behavior.

---

## Markdown Import/Export

Enable the toolbar button via `showMarkdownButton`:

```tsx
<RichTextEditor
  toolbarConfig={{ showMarkdownButton: true }}
/>
```

Click the **MD** icon to open a dialog pre-filled with the current content converted to Markdown:

- **Copy** — copies the Markdown text to the clipboard, for exporting into a `.md` file or another tool.
- **Apply** — replaces the editor content with whatever is currently in the text field (edit it first if you want to import different Markdown).
- **Cancel** — closes the dialog without changing the editor content.

For a live export without opening the dialog, use `onMarkdownChange` — it fires alongside `onChange` on every content change, with the content already converted to Markdown:

```tsx
<RichTextEditor
  onChange={(html) => setHtml(html)}
  onMarkdownChange={(markdown) => setMarkdown(markdown)}
/>
```

---

## Mention (@)

> **Since v3.14.0**

### What does this feature do?

When a user types `@` in the editor, a small dropdown appears with a list of names. The user can keep typing to filter the list, then click a name or press `Enter` to insert it. The mention appears highlighted in the text as `@Alice Johnson`. The feature works exactly like you know it from Slack, Notion, or Jira.

**You are responsible for the list of names.** The library only draws the dropdown and handles the keyboard navigation — it does not search a database or call any API on its own. That is intentional: you keep full control over who can be mentioned and how the search works.

---

### Getting started — your first mention in 3 steps

**Step 1 — Define your list of people**

Each person needs an `id` (unique identifier, used internally) and a `label` (the name shown in the dropdown and in the text):

```tsx
// This list can come from anywhere: hardcoded, loaded from an API, from a Redux store…
const TEAM: MentionItem[] = [
  { id: "alice",   label: "Alice Johnson" },
  { id: "bob",     label: "Bob Smith" },
  { id: "carol",   label: "Carol Williams" },
];
```

**Step 2 — Pass the list to the editor**

```tsx
<RichTextEditor
  mentionItems={TEAM}   // <-- activates the @ feature
  onChange={setContent} // called on every change, delivers the full HTML as a string
/>
```

That's it. The `@` key now opens the dropdown. The library filters the list automatically as the user types — `@ali` narrows it down to "Alice Johnson".

**Step 3 — Read the result**

`onChange` gives you an HTML string. Mentions are saved inside it as a `<span>` with data attributes:

```html
<!-- What onChange delivers when "Hello @Alice Johnson" was typed: -->
<p>
  Hello
  <span data-type="mention" data-id="alice" data-label="Alice Johnson">
    @Alice Johnson
  </span>
</p>
```

The `data-id` attribute holds the value you set in Step 1 (`"alice"`). On your backend you use this id to look up the actual user — not the label, because labels can change (a user might rename themselves) while the id stays stable.

---

### Async / server-side search

If your user list is large (thousands of entries), loading all of them upfront is inefficient. With `onMentionSearch` you can query your backend on every keystroke instead:

```tsx
// The library calls this function every time the user types after @
// query = whatever was typed after @, e.g. "ali" when the user typed "@ali"
const handleMentionSearch = async (query: string): Promise<MentionItem[]> => {
  const res = await fetch(`/api/users?q=${encodeURIComponent(query)}`);
  return res.json(); // your API must return { id: string; label: string }[]
};

// Note: mentionItems is not needed here — onMentionSearch replaces the built-in filter
<RichTextEditor
  onMentionSearch={handleMentionSearch}
  onChange={setContent}
/>
```

> **When to use which approach?**
> - Small list (< a few hundred entries, loaded once): use `mentionItems` — simpler, no network call on every keystroke.
> - Large list or fuzzy/ranked search: use `onMentionSearch` — you control the search logic entirely.

---

### Custom trigger character

If `@` conflicts with another feature in your app, you can change the trigger character:

```tsx
<RichTextEditor
  mentionItems={TEAM}
  mentionTriggerChar="#"  // now # opens the dropdown instead of @
/>
```

### Translating the "no results" label

```tsx
<RichTextEditor
  mentionItems={TEAM}
  translation={{ mentionNoResults: "No one found" }}
/>
```

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

## Callbacks / Events

> **Which callbacks fire for which action?**
>
> | Action | Callbacks fired |
> |---|---|
> | Typing, formatting, pasting, toolbar action | `onChange`, `onMarkdownChange` |
> | Editor gains focus | `onFocus` |
> | Editor loses focus | `onBlur` |
> | Ctrl+S / Cmd+S pressed | `onSave` |
> | `value` prop updated externally | *(none — prevents infinite loops)* |

| Callback | Signature | When it fires | Use it when... |
|---|---|---|---|
| `onChange` | `(value: string) => void` | Every user-driven content change (typing, formatting, paste, toolbar buttons) | Controlled mode state sync — update your `value` state here |
| `onMarkdownChange` | `(markdown: string) => void` | Same as `onChange`, fired immediately after it | You need the content as Markdown without opening the Markdown dialog |
| `onMentionSearch` | `(query: string) => MentionItem[] \| Promise<MentionItem[]>` | Every keystroke after `@` | Async/server-side mention search — replaces built-in client-side filter |
| `onFocus` | `() => void` | The editor area gains keyboard focus | Highlighting an active editor, showing toolbars conditionally |
| `onBlur` | `() => void` | The editor area loses keyboard focus | Triggering validation, auto-saving on leave |
| `onSave` | `() => void` | User presses Ctrl+S or Cmd+S | Saving content to a backend or local storage — the browser's "Save Page" dialog is always suppressed inside the editor |

**Important:** `onChange` does NOT fire when `value` is set externally via the prop (external sync via `setContent`). This prevents infinite loops in controlled mode.

### Persisting to a backend — debouncing `onChange`

`onChange` fires on **every user-driven content change** (keystroke, paste, formatting). For local state this is exactly what you want. If you also write to a backend on every change, you will flood it — apply a debounce in your own code:

```tsx
import { useCallback, useRef } from "react";

function useDebounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), ms);
  }, [fn, ms]) as T;
}

function MyEditor() {
  const [content, setContent] = useState("<p>Hello</p>");

  // Local state update is instant — no debounce needed here.
  // Backend persistence is debounced to avoid flooding the API.
  const saveToBackend = useDebounce((html: string) => {
    api.saveContent(html);
  }, 500);

  return (
    <RichTextEditor
      value={content}
      onChange={(html) => {
        setContent(html);        // instant — for the controlled value
        saveToBackend(html);     // debounced — for the backend call
      }}
    />
  );
}
```

**Why the library does not debounce internally:** The right delay (300–1000 ms for REST, 0 for local state, custom for real-time collab) depends on the application. An internal debounce would force all apps to fight it.

---

## Architecture Decisions

| Topic | Decision |
|---|---|
| **No state store** | TipTap `useEditor` manages the editor state internally |
| **No CSS** | Exclusively MUI `sx` prop and `.ProseMirror` selector |
| **TipTap v3** | StarterKit already includes `Link` and `Underline` — no separate imports needed |
| **`shouldRerenderOnTransaction: true`** | Required in TipTap v3 so toolbar buttons reflect their active state |
| **`onMouseDown` preventDefault** | Every toolbar button prevents the editor from losing focus when clicked |
| **Ref-mirrored state for paste handling** | `editorProps.handlePaste` is bound once when `useEditor` is called — reading React state directly inside it would always see the value from that first render. The toggle's state is mirrored into a ref via `useEffect` so the handler always reads the current value. |
| **`editorProps.handlePaste` over a plugin** | ProseMirror checks the view's own `handlePaste` prop before any plugin-registered handler, so this approach reliably overrides `tiptap-markdown`'s paste-to-richtext conversion while the toggle is active, without disabling the extension. |
| **Module augmentation for `editor.storage.markdown`** | `tiptap-markdown` doesn't ship a `Storage` interface augmentation, so the library declares one locally to keep `editor.storage.markdown.getMarkdown()` fully typed instead of falling back to `any`. |
| **`height` on `Paper`** | The total height (toolbar + content) sits on the `Paper` wrapper; the content area fills the rest via `flex: 1` |
| **`normalizeSize()`** | Converts numeric strings (`"300"`) to numbers so MUI appends `px` — enables Storybook text controls |
| **`tiptap-markdown`** | Free community package (`transformPastedText: true`) — no TipTap Pro required |
