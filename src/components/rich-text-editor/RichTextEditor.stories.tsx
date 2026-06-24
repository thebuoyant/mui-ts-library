import { type ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box } from "@mui/material";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  argTypes: {
    // A–Z: kontrollierbare Props
    disabled:           { control: "boolean" },
    error:              { control: "boolean" },
    // Zahlen ("300"), Pixel-Strings ("300px"), Prozent ("50vh") oder "auto" (füllt Container)
    height:             { control: "text" },
    helperText:         { control: "text" },
    maxCharacters:      { control: "number" },
    name:               { control: "text" },
    placeholder:        { control: "text" },
    readonly:           { control: "boolean" },
    showCharacterCount: { control: "boolean" },
    showToolbar:        { control: "boolean" },
    showWordCount:      { control: "boolean" },
    // Zahlen ("600"), Pixel-Strings ("600px"), Prozent ("50%") — leer = 100%
    width:              { control: "text" },
    // Komplexe Objekte / kontrollierter Modus — dedizierte Stories verwenden
    toolbarConfig: { control: false },
    translation:   { control: false },
    value:         { control: false },
    onBlur:        { control: false },
    onChange:      { control: false },
    onFocus:       { control: false },
    onMarkdownChange: { control: false },
  },
  args: {
    // A–Z
    disabled:           false,
    error:              false,
    height:             "",
    helperText:         "",
    maxCharacters:      0,
    name:               "",
    placeholder:        "Hier tippen …",
    readonly:           false,
    showCharacterCount: false,
    showToolbar:        true,
    showWordCount:      false,
    width:              "",
    // Callbacks
    onBlur:             fn(),
    onChange:           fn(),
    onFocus:            fn(),
    onMarkdownChange:   fn(),
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

const SAMPLE_HTML = `
<h2>Willkommen im Rich Text Editor</h2>
<p>Dieser Editor unterstützt <strong>fetten</strong>, <em>kursiven</em> und <u>unterstrichenen</u> Text.</p>
<ul>
  <li>Aufzählungspunkt A</li>
  <li>Aufzählungspunkt B</li>
</ul>
<blockquote>Ein Zitat als Blockquote.</blockquote>
`;

const LONG_HTML = `
<h2>Langer Inhalt — Scrollbar-Demo</h2>
<p>Zeile 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<p>Zeile 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p>Zeile 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
<p>Zeile 4: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
<p>Zeile 5: Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
<p>Zeile 6: Qui officia deserunt mollit anim id est laborum.</p>
<p>Zeile 7: Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.</p>
<p>Zeile 8: Nullam varius, turpis molestie dictum semper, diam lectus porttitor purus.</p>
<p>Zeile 9: Proin a arcu quis massa pretium venenatis eu vel nisi.</p>
<p>Zeile 10: Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full toolbar with all features enabled — including tables, image embed, emoji picker, paste-as-plain-text, and Markdown import/export. All new buttons are opt-in (`false` by default); this story enables them all so you can explore the complete feature set.',
      },
    },
  },
  args: {
    placeholder: "Hier tippen …",
    toolbarConfig: {
      showTableButton: true,
      showImageButton: true,
      showEmojiButton: true,
      showFullscreenButton: true,
      showPasteAsPlainTextButton: true,
      showMarkdownButton: true,
    },
  },
};

export const WithInitialValue: Story = {
  args: {
    value: SAMPLE_HTML,
  },
};

// Demonstriert feste Höhe: Inhalt überläuft → vertikale Scrollbar erscheint
export const WithFixedHeight: Story = {
  args: {
    value:  LONG_HTML,
    height: "200",
  },
};

// Demonstriert "auto": Editor füllt den umgebenden Container (hier 400px)
export const WithAutoHeight: Story = {
  decorators: [
    (Story) => (
      <Box sx={{ height: 400, display: "flex", flexDirection: "column", border: "2px dashed", borderColor: "divider", p: 1 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    value:  SAMPLE_HTML,
    height: "auto",
  },
};

// Demonstriert feste Breite — Editor nimmt nicht die volle Container-Breite ein
export const WithCustomWidth: Story = {
  args: {
    value: SAMPLE_HTML,
    width: "500",
  },
};

function ControlledStory(args: ComponentProps<typeof RichTextEditor>) {
  const [content, setContent] = useState("<p>Kontrollierter Inhalt</p>");
  return (
    <RichTextEditor
      {...args}
      value={content}
      onChange={(val) => {
        setContent(val);
        args.onChange?.(val);
      }}
    />
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledStory {...args} />,
};

export const MinimalToolbar: Story = {
  args: {
    toolbarConfig: {
      showBold:           true,
      showItalic:         true,
      showUnderline:      true,
      showStrike:         false,
      showHeading1:       false,
      showHeading2:       false,
      showHeading3:       false,
      showBulletList:     false,
      showOrderedList:    false,
      showBlockquote:     false,
      showCodeBlock:      false,
      showLink:           false,
      showHorizontalRule: false,
      showUndoRedo:       false,
      showClearFormat:    false,
    },
    placeholder: "Minimale Toolbar — nur Bold, Italic, Underline",
  },
};

export const ReadOnly: Story = {
  args: {
    value:    SAMPLE_HTML,
    readonly: true,
  },
};

export const Disabled: Story = {
  args: {
    value:    SAMPLE_HTML,
    disabled: true,
  },
};

export const WithCharacterCount: Story = {
  args: {
    showCharacterCount: true,
    placeholder:        "Zeichenzähler sichtbar unten rechts …",
  },
};

export const WithMaxCharacters: Story = {
  args: {
    maxCharacters: 200,
    placeholder:   "Maximal 200 Zeichen erlaubt …",
  },
};

export const WithError: Story = {
  args: {
    error:      true,
    helperText: "Pflichtfeld.",
    placeholder: "Fehlerzustand …",
  },
};

// Zeigt das Ergebnis von gepastem Markdown — dieser Inhalt entstand aus reinem Markdown-Text.
// Eigenen Markdown-Text (aus .md-Datei, README etc.) einfach in den Editor einfügen.
export const MarkdownPaste: Story = {
  args: {
    placeholder: "Markdown hier einfügen — z.B. **fett**, # Überschrift, - Liste …",
    value: [
      "<h2>Ergebnis aus gepastem Markdown</h2>",
      "<p>Der folgende Inhalt entstand durch Einfügen von <strong>rohem Markdown-Text</strong>. Eigene <code>.md</code>-Inhalte einfach in den Editor einfügen — sie werden automatisch konvertiert.</p>",
      "<h3>Formatierungen</h3>",
      "<p>Text kann <strong>fett</strong>, <em>kursiv</em> oder <s>durchgestrichen</s> sein.</p>",
      "<h3>Listen</h3>",
      "<ul><li>Aufzählungspunkt A</li><li>Aufzählungspunkt B</li><li>Aufzählungspunkt C</li></ul>",
      "<blockquote><p>Ein Blockzitat aus dem Markdown.</p></blockquote>",
      "<p>Inline-<code>Code</code> und <a href='https://example.com'>Links</a> werden ebenfalls erkannt.</p>",
    ].join(""),
  },
};

export const WithTextColor: Story = {
  args: {
    value: [
      '<p>Textfarben können pro Zeichen vergeben werden:',
      ' <span style="color:#ff0000">Rot</span>,',
      ' <span style="color:#1e90ff">Blau</span>,',
      ' <span style="color:#008000">Grün</span>,',
      ' <span style="color:#ff8c00">Orange</span>.</p>',
      '<p>Text markieren → A-Button in der Toolbar → Farbe wählen.</p>',
    ].join(""),
  },
};

export const WithHighlight: Story = {
  args: {
    value: [
      "<p>Hervorhebungen funktionieren wie ein Textmarker:",
      ' <mark style="background-color:#ffff00">Gelb</mark>,',
      ' <mark style="background-color:#90ee90">Grün</mark>,',
      ' <mark style="background-color:#87ceeb">Blau</mark>,',
      ' <mark style="background-color:#ff69b4">Pink</mark>.</p>',
      "<p>Text markieren → Pinsel-Button in der Toolbar → Farbe wählen.</p>",
    ].join(""),
  },
};

export const WithWordCount: Story = {
  args: {
    showWordCount:      true,
    showCharacterCount: true,
    placeholder:        "Tippen — Wörter und Zeichen werden unten gezählt …",
    value:              SAMPLE_HTML,
  },
};

export const NoToolbar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showToolbar={false}` hides the entire toolbar while keeping the editor **fully editable**. ' +
          'Unlike `readonly`, the user can still type, paste, and format text. ' +
          'This mode is useful for minimal inline editors, comment boxes, or when you provide a completely custom toolbar.',
      },
    },
  },
  args: {
    showToolbar: false,
    value:       SAMPLE_HTML,
    placeholder: "No toolbar — still fully editable …",
  },
};

export const WithTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enables the **Table** toolbar button (`showTableButton: true`). ' +
          'Click the table icon to insert a 3×3 table with a header row. ' +
          'Click inside any cell and re-open the menu to add/remove rows and columns, or delete the entire table.',
      },
    },
  },
  args: {
    toolbarConfig: { showTableButton: true },
    value: `<p>Click the table icon in the toolbar to insert a table.</p>`,
    height: "300",
  },
};

export const WithImageEmbed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enables the **Image** toolbar button (`showImageButton: true`). ' +
          'Click the image icon, paste any public image URL, and optionally provide alt text. ' +
          'Images are displayed inline with `max-width: 100%` and support Base64 URLs.',
      },
    },
  },
  args: {
    toolbarConfig: { showImageButton: true },
    value: `<p>Click the image icon to embed an image by URL.</p>`,
    height: "300",
  },
};

export const WithEmojiPicker: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enables the **Emoji Picker** toolbar button (`showEmojiButton: true`). ' +
          'Click the smiley icon to open a popover with ~200 curated emojis across 6 categories. ' +
          'Use the search field to filter by emoji name. Clicking an emoji inserts it at the cursor.',
      },
    },
  },
  args: {
    toolbarConfig: { showEmojiButton: true },
    value: `<p>Click the smiley icon and pick an emoji 😀</p>`,
  },
};

export const WithFullscreen: Story = {
  args: {
    toolbarConfig: { showFullscreenButton: true },
    value:         SAMPLE_HTML,
    placeholder:   "Fullscreen-Button in der Toolbar rechts oben …",
  },
};

export const WithPasteAsPlainText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enables the **Paste as plain text** toggle (`showPasteAsPlainTextButton: true`). ' +
          'When active, any pasted content — rich HTML from a website, a Word doc, another editor — ' +
          'is stripped of all formatting and inserted as plain text. Click the button again to return to normal paste behavior.',
      },
    },
  },
  args: {
    toolbarConfig: { showPasteAsPlainTextButton: true },
    value: `<p>Toggle the clipboard icon, then paste some <strong>formatted</strong> <em>content</em> here.</p>`,
    height: "250",
  },
};

export const WithMarkdownImportExport: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enables the **Markdown** toolbar button (`showMarkdownButton: true`). ' +
          'Opens a dialog pre-filled with the current content converted to Markdown — copy it to export, ' +
          'or edit it and click Apply to replace the editor content. ' +
          'Use `onMarkdownChange` to receive the Markdown representation on every change, independent of the dialog.',
      },
    },
  },
  args: {
    toolbarConfig: { showMarkdownButton: true },
    value: SAMPLE_HTML,
    height: "300",
  },
};

export const GermanTranslation: Story = {
  args: {
    placeholder: "Hier tippen …",
    showCharacterCount: true,
    translation: {
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
      table:             "Tabelle",
      insertTable:       "3×3-Tabelle einfügen",
      addRowBefore:      "Zeile davor einfügen",
      addRowAfter:       "Zeile danach einfügen",
      deleteRow:         "Zeile löschen",
      addColumnBefore:   "Spalte davor einfügen",
      addColumnAfter:    "Spalte danach einfügen",
      deleteColumn:      "Spalte löschen",
      deleteTable:       "Tabelle löschen",
      image:             "Bild einfügen",
      imageDialogTitle:  "Bild einfügen",
      imageDialogUrlLabel: "Bild-URL",
      imageDialogAltLabel: "Alternativtext (optional)",
      imageDialogSave:   "Einfügen",
      imageDialogCancel: "Abbrechen",
      emoji:                  "Emoji",
      emojiSearchPlaceholder: "Emoji suchen …",
    },
  },
};

// ── Use case: blog post editor ───────────────────────────────────────────────

const BLOG_POST_HTML = `<h1>10 Lessons From Scaling Our API to 1M Requests/Day</h1>
<p><em>Published by Maria Chen · 8 min read</em></p>
<p>When we launched in 2023, our API handled a few thousand requests a day. ` +
  `Eighteen months later, we're well past a million — and the journey taught us things ` +
  `no amount of planning could have.</p>
<h2>1. Caching is not optional</h2>
<p>We deferred a proper caching layer for "later" three separate times. Each time, ` +
  `it came back to bite us during a traffic spike. <strong>Build it before you think you need it.</strong></p>
<h2>2. Rate limiting protects you from yourself</h2>
<p>Most of our worst incidents were caused by <em>our own</em> retry logic, not external abuse.</p>
<blockquote>"The first DDoS we suffered was self-inflicted." — a lesson learned the hard way.</blockquote>
<h2>3. Observability pays for itself in the first incident</h2>
<p>Every dollar spent on tracing and structured logging came back tenfold the first time ` +
  `we had to debug a 3am outage.</p>
<p>Read the full write-up on our <a href="https://example.com/engineering-blog">engineering blog</a>.</p>`;

export const BlogPostEditor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: a CMS blog post editor.** ' +
          'Long-form content with headings, blockquotes, links, and emphasis — the full toolbar earns its keep here. ' +
          '`showWordCount` helps writers hit a target length.',
      },
    },
  },
  args: {
    value: BLOG_POST_HTML,
    height: 420,
    showWordCount: true,
    placeholder: "Start writing your post…",
  },
};

// ── Use case: support ticket reply ───────────────────────────────────────────

const SUPPORT_REPLY_HTML = `<p>Hi Alex,</p>
<p>Thanks for reaching out, and sorry for the trouble with your export!</p>
<p>I checked your account and can confirm the CSV export was failing due to a special character ` +
  `in one of your project names. We've shipped a fix — could you try the export again on your end?</p>
<p>If it still fails, here's a quick workaround in the meantime:</p>
<ol>
  <li>Go to <strong>Settings → Projects</strong></li>
  <li>Rename the project (you can rename it back afterward)</li>
  <li>Retry the export</li>
</ol>
<p>Let me know how it goes — happy to help further.</p>
<p>Best,<br/>Support Team</p>`;

export const SupportTicketReply: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: a help-desk reply composer.** ' +
          'A trimmed-down toolbar (`MinimalToolbar`-style) keeps replies consistent and on-brand — ' +
          'numbered steps and bold for emphasis are usually all a support reply needs.',
      },
    },
  },
  args: {
    value: SUPPORT_REPLY_HTML,
    height: 320,
    toolbarConfig: {
      showBold: true, showItalic: true, showUnderline: false, showStrike: false,
      showHeading1: false, showHeading2: false, showHeading3: false,
      showBulletList: true, showOrderedList: true, showBlockquote: false, showCodeBlock: false,
      showLink: true, showHorizontalRule: false, showTextColor: false, showHighlight: false,
      showTableButton: false, showImageButton: false, showEmojiButton: true,
      showUndoRedo: true, showClearFormat: false, showFullscreenButton: false,
    },
  },
};
