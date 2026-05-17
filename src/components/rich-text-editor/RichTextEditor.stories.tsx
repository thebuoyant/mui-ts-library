import { type ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  argTypes: {
    placeholder:        { control: "text" },
    outputFormat:       { control: "radio", options: ["html", "json"] },
    minHeight:          { control: "number" },
    maxHeight:          { control: "text" },  // Zahlen ("300"), Pixel-Strings ("300px"), Prozent ("50%") oder "auto"
    showCharacterCount: { control: "boolean" },
    maxCharacters:      { control: "number" },
    disabled:           { control: "boolean" },
    readonly:           { control: "boolean" },
    error:              { control: "boolean" },
    helperText:         { control: "text" },
    name:               { control: "text" },
    // Kontrollierter Modus — über dedizierte Controlled-Story verwenden
    value:       { control: false },
    // Komplexe Objekte — stattdessen dedizierte Stories verwenden
    toolbarConfig: { control: false },
    translation:   { control: false },
    onChange:      { control: false },
    onBlur:        { control: false },
    onFocus:       { control: false },
  },
  args: {
    onChange:           fn(),
    onBlur:             fn(),
    onFocus:            fn(),
    placeholder:        "Hier tippen …",
    outputFormat:       "html",
    minHeight:          120,
    maxHeight:          "",
    showCharacterCount: false,
    maxCharacters:      0,
    disabled:           false,
    readonly:           false,
    error:              false,
    helperText:         "",
    name:               "",
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

export const WithMaxHeight: Story = {
  args: {
    value:     LONG_HTML,
    maxHeight: "200",
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

export const WithTextColor: Story = {
  args: {
    value:       "<p>Markiere diesen Text und wähle eine <strong>Farbe</strong> aus der Toolbar.</p>",
    placeholder: "Text markieren, dann Textfarbe wählen …",
  },
};

export const WithHighlight: Story = {
  args: {
    value:       "<p>Markiere diesen Text und wähle eine <strong>Hintergrundfarbe</strong> aus der Toolbar.</p>",
    placeholder: "Text markieren, dann Hervorhebungsfarbe wählen …",
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
    },
  },
};
