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
  args: {
    placeholder: "Hier tippen …",
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

export const WithFullscreen: Story = {
  args: {
    toolbarConfig: { showFullscreenButton: true },
    value:         SAMPLE_HTML,
    placeholder:   "Fullscreen-Button in der Toolbar rechts oben …",
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
    },
  },
};
