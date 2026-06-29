import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, TextField, Typography } from "@mui/material";
import { useState, type ComponentProps } from "react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: "Components/PasswordStrengthMeter",
  component: PasswordStrengthMeter,
  args: {
    // A–Z
    disabled:               false,
    error:                  false,
    helperText:             "",
    inputSize:              "medium",
    passwordMinLength:      8,
    showConfirmField:       false,
    showMeter:              true,
    showPasswordAdornment:  true,
    showPasswordGenerator:  false,
    showSegmentedBar:       false,
    showSummary:            true,
    showCopyButton:         false,
    // Callbacks
    onPasswordChange:       fn(),
    onPasswordGenerated:    fn(),
  },
  argTypes: {
    // Props A–Z
    autoComplete:           { control: false },
    checkColors:            { control: false },
    confirmValue:           { control: false },
    customRequirements:     { control: false },
    disabled:               { control: "boolean" },
    error:                  { control: "boolean" },
    generatorOptions:       { control: false },
    helperText:             { control: "text" },
    inputRef:               { control: false },
    inputSize:              { control: "radio", options: ["small", "medium"] },
    meterColors:            { control: false },
    name:                   { control: false },
    passwordMinLength:      { control: "number" },
    showConfirmField:       { control: "boolean" },
    showMeter:              { control: "boolean" },
    showPasswordAdornment:  { control: "boolean" },
    showPasswordGenerator:  { control: "boolean" },
    showSegmentedBar:       { control: "boolean" },
    showSummary:            { control: "boolean" },
    showCopyButton:         { control: "boolean" },
    translation:            { control: false },
    value:                  { control: false },
    // Callbacks A–Z
    onConfirmChange:        { control: false },
    onPasswordChange:       { control: false },
    onPasswordGenerated:    { control: false },
  },
  parameters: {
    controls: { sort: 'alpha' },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const SmallInput: Story = {
  args: {
    inputSize: "small",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const NoMeter: Story = {
  args: {
    showMeter: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const NoSummary: Story = {
  args: {
    showSummary: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const NoAdornment: Story = {
  args: {
    showPasswordAdornment: false,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const GermanTranslation: Story = {
  args: {
    translation: {
      label: "Passwort",
      summaryHeaderLabel: "Anforderungen an Ihr Passwort",
      summaryMinChars: "Mindestens {n} Zeichen",
      summaryCapitalLetter: "Mindestens 1 Großbuchstabe",
      summaryLowerCaseLetter: "Mindestens 1 Kleinbuchstabe",
      summaryNumber: "Mindestens 1 Zahl",
      summarySpecialChar: "Mindestens 1 Sonderzeichen",
      showPasswordLabel: "Passwort anzeigen",
      hidePasswordLabel: "Passwort verbergen",
      meterAriaLabel: "Passwortstärke",
      generatePasswordLabel: "Sicheres Passwort generieren",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const CustomColors: Story = {
  args: {
    meterColors: {
      weak: "#e91e63",
      ok: "#ff9800",
      good: "#2196f3",
      veryGood: "#9c27b0",
    },
    checkColors: {
      failure: "#e91e63",
      success: "#9c27b0",
    },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: "Password does not meet the requirements.",
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

function ControlledStory(args: ComponentProps<typeof PasswordStrengthMeter>) {
  const [password, setPassword] = useState("");

  return (
    <Box sx={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="External password field"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText="This field drives the PasswordStrengthMeter from outside."
      />
      <PasswordStrengthMeter
        {...args}
        value={password}
        showPasswordAdornment={false}
        onPasswordChange={(_, result) => {
          args.onPasswordChange?.(_, result);
        }}
      />
      <Typography variant="caption" color="text.secondary">
        Current value: "{password}"
      </Typography>
    </Box>
  );
}

// Zeigt den kontrollierten Modus: Das Passwort wird von außen verwaltet,
// z. B. wenn die Komponente in ein bestehendes Formular eingebettet wird.
export const Controlled: Story = {
  render: (args) => <ControlledStory {...args} />,
};

export const SegmentedBar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showSegmentedBar` replaces the single growing strength bar with **4 individually animated segments**. ' +
          'Each segment lights up as the password strength increases. ' +
          'The pre-filled password already shows 3 active segments — try changing it to see the segments animate.',
      },
    },
  },
  args: {
    // Pre-filled so the segmented bar effect is immediately visible without typing.
    value:           "MyP@ssw0rd",
    showSegmentedBar: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithCustomRequirements: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`customRequirements` adds your own password rules below the built-in 5. ' +
          'Each entry has a `label` and a `fulfilled` value — either a static `boolean` or a **live function** ' +
          '`(password: string) => boolean` that is re-evaluated on every keystroke. ' +
          'The pre-filled password intentionally violates the "no spaces" rule so you can see both ✅ and ❌ states. ' +
          'Try removing the space to watch both custom requirements turn green.',
      },
    },
  },
  args: {
    // "hello world" → "No spaces allowed" ❌, "Must start with a letter" ✅ — shows mixed state immediately.
    value: "hello world",
    customRequirements: [
      { label: "No spaces allowed",        fulfilled: (pw) => !pw.includes(" ") },
      { label: "Must start with a letter", fulfilled: (pw) => /^[a-zA-Z]/.test(pw) },
    ],
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithPasswordGenerator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showPasswordGenerator={true}` — shows a "Generate secure password" button below the input. ' +
          'Clicking it fills the field with a cryptographically strong password (16 chars by default: ' +
          'uppercase + lowercase + digits + symbols). The password is revealed automatically. ' +
          '`generatorOptions` lets you customize length and character classes. ' +
          '`onPasswordGenerated` fires with the generated password.',
      },
    },
  },
  args: {
    showPasswordGenerator: true,
    showSegmentedBar: true,
    generatorOptions: { length: 20, upper: true, lower: true, numbers: true, symbols: true },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const GeneratorShortLength: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Requesting a `generatorOptions.length` shorter than the number of active character classes ' +
          '— here `length: 3` with all 4 classes (upper/lower/numbers/symbols) active. The generator ' +
          'guarantees one character per active class, so the actual length is the larger of the two: ' +
          'it never produces fewer characters than active classes, and never silently exceeds that ' +
          'guaranteed minimum either. Click "Generate secure password" repeatedly to confirm the length ' +
          'stays consistent.',
      },
    },
  },
  args: {
    showPasswordGenerator: true,
    showSegmentedBar: true,
    generatorOptions: { length: 3, upper: true, lower: true, numbers: true, symbols: true },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithCopyButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showCopyButton={true}` — adds a copy-to-clipboard icon next to the password field, ' +
          'visible once a password is present. Pairs naturally with `showPasswordGenerator`: ' +
          'without a copy button, a generated password is awkward to get out of the field on mobile, ' +
          'where selecting text manually is fiddly. Shows a brief checkmark confirmation after copying.',
      },
    },
  },
  args: {
    showPasswordGenerator: true,
    showCopyButton: true,
    generatorOptions: { length: 20 },
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

export const WithConfirmField: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`showConfirmField={true}` adds a second "Confirm password" input. ' +
          'A green ✓ + "Passwords match" appears when both values are identical. ' +
          'A red ✗ + "Passwords do not match" appears when they differ. ' +
          'Works in controlled (`confirmValue`) and uncontrolled mode. ' +
          '`onConfirmChange(value, matches)` fires on every keystroke.',
      },
    },
  },
  args: {
    showConfirmField: true,
    showSegmentedBar: true,
    showPasswordGenerator: true,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

// ── Use case: SaaS signup form ────────────────────────────────────────────────

export const SignupForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: an account signup form.** ' +
          'Friendly defaults — segmented bar for quick visual feedback, a generator for users who want a strong ' +
          'password without thinking about it, and a confirm field to catch typos before submit.',
      },
    },
  },
  args: {
    showSegmentedBar: true,
    showPasswordGenerator: true,
    showConfirmField: true,
    passwordMinLength: 10,
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>Create your account</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Free 14-day trial, no credit card required.
      </Typography>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};

// ── Use case: admin-enforced password reset ──────────────────────────────────

export const AdminPasswordReset: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '**Real-world use case: an enterprise admin console enforcing a strict security policy** ' +
          '(e.g. SOC 2 / ISO 27001 compliance). `customRequirements` adds organization-specific rules — ' +
          'no dictionary words, no reused passwords — on top of the built-in checks, with a higher minimum length.',
      },
    },
  },
  args: {
    passwordMinLength: 14,
    showSegmentedBar: true,
    customRequirements: [
      { label: "Must not contain your username", fulfilled: (pw) => !pw.toLowerCase().includes("admin") },
      { label: "Must differ from your last 5 passwords", fulfilled: true },
    ],
  },
  render: (args) => (
    <Box sx={{ maxWidth: 420 }}>
      <Typography variant="h6" sx={{ mb: 0.5 }}>Reset Required</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Your organization requires a password reset every 90 days.
      </Typography>
      <PasswordStrengthMeter {...args} />
    </Box>
  ),
};
