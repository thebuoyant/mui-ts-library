import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material";
import { PopoverColorPicker } from "./PopoverColorPicker";

function renderPicker(props?: Partial<Parameters<typeof PopoverColorPicker>[0]>) {
  return render(
    <ThemeProvider theme={createTheme()}>
      <PopoverColorPicker value="#3B82F6" onChange={vi.fn()} {...props} />
    </ThemeProvider>
  );
}

describe("PopoverColorPicker", () => {
  it("renders the swatch button without crashing", () => {
    renderPicker();
    expect(screen.getByRole("button", { name: /open color picker/i })).toBeInTheDocument();
  });

  it("uses a custom aria-label from translation", () => {
    renderPicker({ translation: { openLabel: "Farbe wählen" } });
    expect(screen.getByRole("button", { name: "Farbe wählen" })).toBeInTheDocument();
  });

  it("popover is closed initially", () => {
    renderPicker();
    expect(screen.queryByTestId("popover-color-picker")).not.toBeInTheDocument();
  });

  it("opens the popover when the swatch button is clicked", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.click(screen.getByRole("button", { name: /open color picker/i }));
    expect(screen.getByTestId("popover-color-picker")).toBeInTheDocument();
  });

  it("renders the ColorPicker inside the popover after opening", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.click(screen.getByRole("button", { name: /open color picker/i }));
    expect(screen.getByRole("slider", { name: /hue/i })).toBeInTheDocument();
  });

  it("closes the popover when clicking outside", async () => {
    const user = userEvent.setup();
    renderPicker();
    await user.click(screen.getByRole("button", { name: /open color picker/i }));
    expect(screen.getByTestId("popover-color-picker")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByTestId("popover-color-picker")).not.toBeInTheDocument();
  });

  it("does not open the popover when disabled", async () => {
    const user = userEvent.setup();
    renderPicker({ disabled: true });
    await user.click(screen.getByRole("button", { name: /open color picker/i }));
    expect(screen.queryByTestId("popover-color-picker")).not.toBeInTheDocument();
  });

  it("applies aria-expanded=true when the popover is open", async () => {
    const user = userEvent.setup();
    renderPicker();
    const btn = screen.getByRole("button", { name: /open color picker/i });
    expect(btn).toHaveAttribute("aria-expanded", "false");
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("passes onChange through to the ColorPicker", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderPicker({ onChange });
    await user.click(screen.getByRole("button", { name: /open color picker/i }));
    const hexField = screen.getByRole("textbox", { name: /hex value/i });
    await user.clear(hexField);
    await user.type(hexField, "#ff0000");
    expect(onChange).toHaveBeenCalled();
  });
});
