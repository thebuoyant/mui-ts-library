import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ConfirmDialogProvider, useConfirm } from "./ConfirmDialogProvider";
import type { ConfirmDialogOptions } from "./ConfirmDialog.types";

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof ConfirmDialogProvider> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialogProvider,
  argTypes: {
    // Props A–Z
    children:    { control: false },
    translation: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmDialogProvider>;

// ─── Demo wrapper ─────────────────────────────────────────────────────────────

type DemoProps = {
  options:     ConfirmDialogOptions;
  buttonLabel?: string;
  onConfirm?:  () => void;
  onCancel?:   () => void;
};

function Demo({ options, buttonLabel = "Open Dialog", onConfirm, onCancel }: DemoProps) {
  const confirm = useConfirm();
  const [result, setResult] = useState<boolean | null>(null);

  const handleClick = async () => {
    const confirmed = await confirm(options);
    setResult(confirmed);
    if (confirmed) onConfirm?.();
    else            onCancel?.();
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <Button variant="outlined" onClick={handleClick}>
        {buttonLabel}
      </Button>
      {result !== null && (
        <Typography variant="body2" color={result ? "success.main" : "text.secondary"}>
          Result: <strong>{result ? "confirmed" : "cancelled"}</strong>
        </Typography>
      )}
    </Stack>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Open Confirm Dialog"
          options={{ title: "Are you sure?", description: "This action cannot be undone." }}
          onConfirm={fn()}
          onCancel={fn()}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const NoDescription: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Confirm without description"
          options={{ title: "Confirm?" }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Delete entry"
          options={{
            title:        "Delete this entry?",
            description:  "The entry will be permanently removed. This cannot be undone.",
            confirmLabel: "Delete",
            severity:     "error",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const Warning: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Publish changes"
          options={{
            title:       "Publish changes?",
            description: "The changes will be visible to all users immediately.",
            severity:    "warning",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const Success: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Mark as completed"
          options={{
            title:        "Mark task as completed?",
            description:  "The task will be moved to the completed section.",
            confirmLabel: "Mark completed",
            severity:     "success",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const AlertOnly: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Show info"
          options={{
            title:           "Session expires soon",
            description:     "Your session will expire in 5 minutes. Please save your work.",
            confirmLabel:    "Got it",
            hideCancelButton: true,
            severity:        "warning",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Open (no icon)"
          options={{
            title:       "Are you sure?",
            description: "Please confirm your selection.",
            showIcon:    false,
            severity:    "error",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Submit form"
          options={{
            title:        "Submit your application?",
            description:  "Your application will be sent to the review team.",
            confirmLabel: "Submit application",
            cancelLabel:  "Continue editing",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const LargeDialog: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Open large dialog"
          options={{
            title:       "Terms of Service",
            description: (
              <Stack spacing={1}>
                <Typography variant="body2">
                  By confirming, you agree to our terms of service and privacy policy.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can revoke your consent at any time in your account settings.
                  Your data will be processed in accordance with applicable data protection laws.
                </Typography>
              </Stack>
            ),
            confirmLabel: "I agree",
            cancelLabel:  "Decline",
            maxWidth:     "sm",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const GermanTranslation: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider
        translation={{ confirmLabel: "Bestätigen", cancelLabel: "Abbrechen" }}
      >
        <Demo
          buttonLabel="Eintrag löschen"
          options={{
            title:        "Eintrag löschen?",
            description:  "Der Eintrag wird unwiderruflich gelöscht.",
            confirmLabel: "Löschen",
            severity:     "error",
          }}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const WithCountdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `countdown` option auto-confirms the dialog after n seconds. ' +
          'The confirm button label shows a **live countdown** — e.g. `"Delete (5)"`, `"Delete (4)"`, … — ' +
          'and fires `confirm()` automatically when it reaches zero. ' +
          'Click the button and watch the countdown run. ' +
          '**Bonus:** while the dialog is open, pressing **`Enter`** confirms immediately (keyboard shortcut built-in).',
      },
    },
  },
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Demo
          buttonLabel="Delete (auto-confirms in 5 s)"
          options={{
            title:        "Delete this record?",
            description:  "This will be confirmed automatically after the countdown.",
            confirmLabel: "Delete",
            severity:     "error",
            countdown:    5,
          }}
          onConfirm={fn()}
          onCancel={fn()}
        />
      </ConfirmDialogProvider>
    </Box>
  ),
};

export const MultipleDialogs: Story = {
  render: () => (
    <Box sx={{ p: 2 }}>
      <ConfirmDialogProvider>
        <Stack spacing={2} direction="row">
          <Demo
            buttonLabel="Save"
            options={{
              title:    "Save changes?",
              severity: "success",
            }}
          />
          <Demo
            buttonLabel="Delete"
            options={{
              title:        "Delete entry?",
              description:  "This cannot be undone.",
              confirmLabel: "Delete",
              severity:     "error",
            }}
          />
        </Stack>
      </ConfirmDialogProvider>
    </Box>
  ),
};
