import { type ComponentProps, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  argTypes: {
    disabled:           { control: "boolean" },
    readonly:           { control: "boolean" },
    showCharacterCount: { control: "boolean" },
    outputFormat:       { control: "radio", options: ["html", "json"] },
  },
  args: {
    onChange: fn(),
    onBlur:   fn(),
    onFocus:  fn(),
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
