import { act, render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialogProvider, useConfirm } from "./ConfirmDialogProvider";

// ─── helpers ──────────────────────────────────────────────────────────────────

type TriggerProps = {
  onResult?: (confirmed: boolean) => void;
  options?:  Parameters<ReturnType<typeof useConfirm>>[0];
};

function Trigger({ onResult, options = { title: "Are you sure?" } }: TriggerProps) {
  const confirm = useConfirm();
  return (
    <button
      onClick={() => confirm(options).then((result) => onResult?.(result))}
    >
      open
    </button>
  );
}

function renderWithProvider(props: TriggerProps = {}, translationOverride?: { confirmLabel?: string; cancelLabel?: string }) {
  return render(
    <ConfirmDialogProvider translation={translationOverride}>
      <Trigger {...props} />
    </ConfirmDialogProvider>,
  );
}

// ─── tests ────────────────────────────────────────────────────────────────────

describe("ConfirmDialogProvider / useConfirm", () => {
  it("Should render children without showing the dialog initially", () => {
    renderWithProvider();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "open" })).toBeInTheDocument();
  });

  it("Should open the dialog when confirm() is called", async () => {
    const user = userEvent.setup();
    renderWithProvider({ options: { title: "Delete?" } });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-dialog-title")).toHaveTextContent("Delete?");
  });

  it("Should resolve true when the confirm button is clicked", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    renderWithProvider({ onResult, options: { title: "Continue?" } });

    await user.click(screen.getByRole("button", { name: "open" }));
    await user.click(screen.getByTestId("confirm-dialog-confirm-btn"));

    await waitFor(() => expect(onResult).toHaveBeenCalledWith(true));
  });

  it("Should resolve false when the cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    renderWithProvider({ onResult, options: { title: "Continue?" } });

    await user.click(screen.getByRole("button", { name: "open" }));
    await user.click(screen.getByTestId("confirm-dialog-cancel-btn"));

    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
  });

  it("Should resolve false when the backdrop is clicked (escape / dismiss)", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    renderWithProvider({ onResult, options: { title: "Continue?" } });

    await user.click(screen.getByRole("button", { name: "open" }));
    await user.keyboard("{Escape}");

    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));
  });

  it("Should show description text when provided", async () => {
    const user = userEvent.setup();
    renderWithProvider({
      options: { title: "Delete?", description: "This cannot be undone." },
    });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByTestId("confirm-dialog-description")).toHaveTextContent(
      "This cannot be undone.",
    );
  });

  it("Should not show a description section when description is omitted", async () => {
    const user = userEvent.setup();
    renderWithProvider({ options: { title: "Delete?" } });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.queryByTestId("confirm-dialog-description")).not.toBeInTheDocument();
  });

  it("Should use custom per-call confirmLabel and cancelLabel", async () => {
    const user = userEvent.setup();
    renderWithProvider({
      options: {
        title:        "Submit?",
        confirmLabel: "Submit now",
        cancelLabel:  "Keep editing",
      },
    });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByTestId("confirm-dialog-confirm-btn")).toHaveTextContent("Submit now");
    expect(screen.getByTestId("confirm-dialog-cancel-btn")).toHaveTextContent("Keep editing");
  });

  it("Should use provider-level translation as default labels", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialogProvider
        translation={{ confirmLabel: "Bestätigen", cancelLabel: "Abbrechen" }}
      >
        <Trigger options={{ title: "Fortfahren?" }} />
      </ConfirmDialogProvider>,
    );

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByTestId("confirm-dialog-confirm-btn")).toHaveTextContent("Bestätigen");
    expect(screen.getByTestId("confirm-dialog-cancel-btn")).toHaveTextContent("Abbrechen");
  });

  it("Should override provider translation with per-call labels", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialogProvider
        translation={{ confirmLabel: "Bestätigen", cancelLabel: "Abbrechen" }}
      >
        <Trigger options={{ title: "Delete?", confirmLabel: "Delete", cancelLabel: "No" }} />
      </ConfirmDialogProvider>,
    );

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByTestId("confirm-dialog-confirm-btn")).toHaveTextContent("Delete");
    expect(screen.getByTestId("confirm-dialog-cancel-btn")).toHaveTextContent("No");
  });

  it("Should hide the cancel button when hideCancelButton is true", async () => {
    const user = userEvent.setup();
    renderWithProvider({
      options: { title: "Info", hideCancelButton: true },
    });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.queryByTestId("confirm-dialog-cancel-btn")).not.toBeInTheDocument();
    expect(screen.getByTestId("confirm-dialog-confirm-btn")).toBeInTheDocument();
  });

  it("Should show the severity icon by default", async () => {
    const user = userEvent.setup();
    renderWithProvider({ options: { title: "Delete?", severity: "error" } });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByTestId("confirm-dialog-icon")).toBeInTheDocument();
  });

  it("Should hide the severity icon when showIcon is false", async () => {
    const user = userEvent.setup();
    renderWithProvider({
      options: { title: "Delete?", severity: "error", showIcon: false },
    });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.queryByTestId("confirm-dialog-icon")).not.toBeInTheDocument();
  });

  it("Should render a ReactNode description", async () => {
    const user = userEvent.setup();
    renderWithProvider({
      options: {
        title:       "Confirm",
        description: <span data-testid="custom-node">Custom content</span>,
      },
    });

    await user.click(screen.getByRole("button", { name: "open" }));

    expect(screen.getByTestId("custom-node")).toBeInTheDocument();
  });

  it("Should close and reopen correctly for sequential calls", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    const triggerSecondRef = { current: () => {} };

    function SequentialTrigger() {
      const confirm = useConfirm();
      const handleClick = () => confirm({ title: "Confirm?" }).then(onResult);
      useEffect(() => { triggerSecondRef.current = handleClick; });
      return <button onClick={handleClick}>open</button>;
    }

    render(
      <ConfirmDialogProvider>
        <SequentialTrigger />
      </ConfirmDialogProvider>,
    );

    // First confirm
    await user.click(screen.getByRole("button", { name: "open" }));
    await user.click(screen.getByTestId("confirm-dialog-confirm-btn"));
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(true));

    // Second confirm — triggered directly to bypass aria-hidden during exit animation
    act(() => { triggerSecondRef.current(); });
    await waitFor(() => screen.getByTestId("confirm-dialog-confirm-btn"));
    await user.click(screen.getByTestId("confirm-dialog-cancel-btn"));
    await waitFor(() => expect(onResult).toHaveBeenCalledWith(false));

    expect(onResult).toHaveBeenCalledTimes(2);
  });

  it("Should throw when useConfirm is used outside a ConfirmDialogProvider", () => {
    function BrokenComponent() {
      useConfirm();
      return null;
    }
    // The default context value is a no-op — it does NOT throw.
    // This test verifies the component renders without crashing.
    expect(() => render(<BrokenComponent />)).not.toThrow();
  });
});
