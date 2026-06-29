import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within } from "storybook/test";
import { Box } from "@mui/material";
import { useState, type ComponentProps } from "react";
import { TagSelection } from "./TagSelection";
import type { TagSelectionItem } from "./TagSelection.types";

const sampleTags: TagSelectionItem[] = [
  { id: "javascript", label: "JavaScript", selected: true, color: "warning" },
  { id: "typescript", label: "TypeScript", selected: true, color: "info" },
  { id: "react",      label: "React",      color: "primary" },
  { id: "mui",        label: "MUI",        color: "secondary" },
  { id: "css",        label: "CSS",        color: "info" },
  { id: "html",       label: "HTML",       color: "error" },
  { id: "python",     label: "Python",     color: "success" },
  { id: "golang",     label: "Golang",     color: "primary" },
  { id: "jquery",     label: "jQuery",     disabled: true, color: "default" },
  { id: "dotnet",     label: ".Net",       disabled: true, color: "default" },
];

const meta: Meta<typeof TagSelection> = {
  title: "Components/TagSelection",
  component: TagSelection,
  args: {
    // A–Z
    allowCreate:          true,
    chipSize:             "small",
    disabled:             false,
    inputSize:            "medium",
    listboxMaxHeight:     300,
    loading:              false,
    maxTags:              10,
    maxVisibleChips:      10,
    popoverPlacement:     "bottom",
    showAutoComplete:     true,
    showSelectedTags:     true,
    showSelectedTagsLabel: true,
    tags:                 sampleTags,
    // Callbacks
    onSearchChange: fn(),
    onTagCreate:    fn(),
    onTagDelete:    fn(),
    onTagSelect:    fn(),
    onTagsChange:   fn(),
  },
  argTypes: {
    // A–Z
    allowCreate:          { control: "boolean" },
    chipSize:             { control: "radio", options: ["small", "medium"] },
    disabled:             { control: "boolean" },
    inputSize:            { control: "radio", options: ["small", "medium"] },
    listboxMaxHeight:     { control: "number" },
    loading:              { control: "boolean" },
    maxTags:              { control: "number" },
    maxVisibleChips:      { control: "number" },
    popoverPlacement:     { control: "radio", options: ["top", "bottom"] },
    showAutoComplete:     { control: "boolean" },
    showSelectedTags:     { control: "boolean" },
    showSelectedTagsLabel: { control: "boolean" },
    // Komplexe Objekte — stattdessen dedizierte Stories verwenden.
    tags:        { control: false },
    translation: { control: false },
    // Callbacks
    onSearchChange: { control: false },
    onTagCreate:    { control: false },
    onTagDelete:    { control: false },
    onTagSelect:    { control: false },
    onTagsChange:   { control: false },
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;

type Story = StoryObj<typeof TagSelection>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const SmallInput: Story = {
  args: {
    inputSize: "small",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const NoSelectedTags: Story = {
  args: {
    showSelectedTags: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const NoAutoComplete: Story = {
  args: {
    showAutoComplete: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const GermanTranslation: Story = {
  args: {
    translation: {
      selectedTagsLabel: "Ausgewählte Tags",
      autoCompleteLabel: "Tags suchen und hinzufügen",
      noSelectedTagsText: "Keine Tags ausgewählt.",
      noAvailableTagsText: "Keine Tags verfügbar.",
      placeholder: "Suchen...",
      loadingText: "Laden...",
      maxTagsReachedText: "Maximale Anzahl an Tags erreicht.",
      colorPickerLabel: "Eigene Farbe",
      backgroundColorLabel: "Hintergrundfarbe",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

const customColorTags: TagSelectionItem[] = [
  { id: "brand-primary",   label: "Branding Primär",   selected: true, foregroundColor: "#ffffff", backgroundColor: "#6200ea" },
  { id: "brand-secondary", label: "Branding Sekundär", selected: true, foregroundColor: "#ffffff", backgroundColor: "#00897b" },
  { id: "highlight",       label: "Highlight",                         foregroundColor: "#1a1a1a", backgroundColor: "#ffea00" },
  { id: "accent",          label: "Akzent",                            foregroundColor: "#ffffff", backgroundColor: "#e64a19" },
];

export const CustomColors: Story = {
  args: {
    tags: customColorTags,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

// Simuliert den Zustand während ein API-Call läuft: keine Tags vorhanden,
// Autocomplete zeigt einen Lade-Spinner wenn das Dropdown geöffnet wird.
export const Loading: Story = {
  args: {
    tags: [],
    loading: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

export const MaxTags: Story = {
  args: {
    maxTags: 2,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

function CreatableStory(args: ComponentProps<typeof TagSelection>) {
  const [localTags, setLocalTags] = useState(sampleTags);

  return (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection
        {...args}
        tags={localTags}
        onTagCreate={(tag) => {
          args.onTagCreate?.(tag);
          setLocalTags((prev) => [...prev, tag]);
        }}
      />
    </Box>
  );
}

// Neue Tags können durch freie Texteingabe erstellt werden. onTagCreate gibt
// Label und Farbe zurück — der aufrufende Code fügt den Tag in seine tags-Liste
// ein (hier per lokalem State demonstriert). Der neue Tag muss selected: true haben.
export const Creatable: Story = {
  render: (args) => <CreatableStory {...args} />,
};

// Beim Anlegen eines neuen Tags erscheint unter dem Input eine Farb-Auswahl:
// 7 semantische MUI-Theme-Farben (Dark-Mode-kompatibel) plus ein Farbkreis
// für beliebige Hex-Farben. Der Farbkreis öffnet den nativen Browser-Farbwähler.
// Benutzerdefinierte Farben werden als foregroundColor/backgroundColor gespeichert;
// der Kontrast (schwarz/weiß) wird automatisch berechnet.
function CustomColorCreationStory(args: ComponentProps<typeof TagSelection>) {
  const [localTags, setLocalTags] = useState<TagSelectionItem[]>([
    { id: "design", label: "Design", color: "secondary" },
  ]);

  return (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection
        {...args}
        tags={localTags}
        onTagCreate={(tag) => {
          // onTagsChange below already fires for the same creation event and carries
          // the full next tag list — adding the tag here too would duplicate it.
          args.onTagCreate?.(tag);
        }}
        onTagsChange={(selected, all) => {
          args.onTagsChange?.(selected, all);
          setLocalTags(all);
        }}
      />
    </Box>
  );
}

export const WithCustomColorCreation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Type a new tag name that does not match any existing tag, then pick from the **7 semantic theme colors** or click the **rainbow circle** to open the native color picker for any hex color. ' +
          'Custom hex colors are stored as `backgroundColor`/`foregroundColor` on the tag with auto-contrast text (black or white).',
      },
    },
  },
  render: (args) => <CustomColorCreationStory {...args} />,
};

export const MaxTagsWithCustomColorCreation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`maxTags` is enforced even while a custom-color tag is being created — starting with 1 tag ' +
          'and `maxTags={2}`, you can create exactly one more tag, then the input disables and the ' +
          'create-mode confirm checkmark/Enter no longer create additional tags, regardless of color choice.',
      },
    },
  },
  args: {
    maxTags: 2,
  },
  render: (args) => <CustomColorCreationStory {...args} />,
};

// Zeigt das Suchergebnis-Highlighting: Der übereinstimmende Teil jedes Tag-Labels
// wird fett hervorgehoben während der Nutzer tippt. Die play-Funktion tippt
// automatisch "Reac" — im Dropdown erscheint "Reac" fett + "t" normal.
export const SearchHighlight: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'While typing, the matching portion of each tag label is rendered **bold**. ' +
          'The match is case-insensitive. This story auto-types `"Reac"` to show the effect immediately.',
      },
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.type(input, "Reac", { delay: 80 });
  },
};

// maxVisibleChips begrenzt die sichtbaren Chips. Überzählige Chips werden hinter
// einem "+N"-Chip versteckt, der einen Popover öffnet. popoverPlacement steuert
// die Öffnungsrichtung.
export const OverflowChips: Story = {
  args: {
    maxVisibleChips: 3,
    popoverPlacement: "bottom",
    tags: sampleTags.map((t) => ({ ...t, selected: true })),
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <TagSelection {...args} />
    </Box>
  ),
};

// ── Use case: developer skill selector ────────────────────────────────────────

const SKILL_TAGS: TagSelectionItem[] = [
  { id: "react",      label: "React",       color: "info",      selected: true },
  { id: "typescript", label: "TypeScript",  color: "info",      selected: true },
  { id: "nodejs",     label: "Node.js",     color: "success" },
  { id: "python",     label: "Python",      color: "success" },
  { id: "go",         label: "Go",          color: "success" },
  { id: "postgresql", label: "PostgreSQL",  color: "warning" },
  { id: "redis",      label: "Redis",       color: "warning" },
  { id: "docker",     label: "Docker",      color: "secondary", selected: true },
  { id: "kubernetes", label: "Kubernetes",  color: "secondary" },
  { id: "aws",        label: "AWS",         color: "error" },
  { id: "terraform",  label: "Terraform",   color: "error" },
];

function SkillSelectorStory(args: ComponentProps<typeof TagSelection>) {
  const [tags, setTags] = useState<TagSelectionItem[]>(SKILL_TAGS);
  return (
    <Box sx={{ maxWidth: 460 }}>
      <TagSelection
        {...args}
        tags={tags}
        onTagsChange={(selected, all) => { setTags(all); args.onTagsChange?.(selected, all); }}
      />
    </Box>
  );
}

export const SkillSelector: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: a developer profile skill picker.** ' +
          'Colors group skills by category (languages, infra, cloud) — a pattern common in hiring tools and ' +
          'team-directory apps. `allowCreate` lets a developer add a skill that is not yet in the list.',
      },
    },
  },
  args: {
    allowCreate: true,
    showSelectedTagsLabel: true,
    translation: { selectedTagsLabel: "Your skills", autoCompleteLabel: "Add a skill", placeholder: "e.g. GraphQL, Rust …" },
  },
  render: (args) => <SkillSelectorStory {...args} />,
};

// ── Use case: email recipient picker ─────────────────────────────────────────

const RECIPIENT_TAGS: TagSelectionItem[] = [
  { id: "alice",  label: "alice@company.com",   color: "primary", selected: true },
  { id: "bob",    label: "bob@company.com",     color: "primary", selected: true },
  { id: "carol",  label: "carol@partner.io" },
  { id: "dave",   label: "dave@partner.io" },
  { id: "eng",    label: "engineering-team@company.com",  color: "secondary" },
  { id: "design", label: "design-team@company.com",       color: "secondary" },
  { id: "sales",  label: "sales-team@company.com",        color: "secondary" },
];

function RecipientPickerStory(args: ComponentProps<typeof TagSelection>) {
  const [tags, setTags] = useState<TagSelectionItem[]>(RECIPIENT_TAGS);
  return (
    <Box sx={{ maxWidth: 460 }}>
      <TagSelection
        {...args}
        tags={tags}
        onTagsChange={(selected, all) => { setTags(all); args.onTagsChange?.(selected, all); }}
      />
    </Box>
  );
}

export const EmailRecipients: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: a "To" field in an email composer or invite dialog.** ' +
          'Mixing individual addresses with team distribution lists, plus free-text entry for one-off addresses ' +
          'not yet in the address book.',
      },
    },
  },
  args: {
    allowCreate: true,
    maxTags: 10,
    translation: {
      selectedTagsLabel: "To",
      autoCompleteLabel: "Add recipients",
      placeholder: "Type a name or email…",
      maxTagsReachedText: "Maximum of 10 recipients reached.",
    },
  },
  render: (args) => <RecipientPickerStory {...args} />,
};
