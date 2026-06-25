import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

describe("PasswordStrengthMeter", () => {
  it("Should render with its default label and hidden password input", () => {
    render(<PasswordStrengthMeter />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.type).toBe("password");
    expect(
      screen.getByText("Requirements for your password"),
    ).toBeInTheDocument();
  });

  it("Should toggle the password visibility when the adornment button is clicked", async () => {
    const user = userEvent.setup();

    render(<PasswordStrengthMeter />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const showButton = screen.getByRole("button", { name: "Show password" });

    await user.click(showButton);
    expect(input.type).toBe("text");

    const hideButton = screen.getByRole("button", { name: "Hide password" });
    await user.click(hideButton);
    expect(input.type).toBe("password");
  });

  it("Should call onPasswordChange with the typed password and calculated result", async () => {
    const user = userEvent.setup();
    const handlePasswordChange = vi.fn();

    render(<PasswordStrengthMeter onPasswordChange={handlePasswordChange} />);

    const input = screen.getByLabelText("Password");
    await user.type(input, "Qw7!mnOp");

    expect(handlePasswordChange).toHaveBeenCalled();
    expect(handlePasswordChange).toHaveBeenLastCalledWith(
      "Qw7!mnOp",
      expect.objectContaining({
        score: 3,
        percent: 75,
        meterStatus: "good",
        length: 8,
        hasLower: true,
        hasUpper: true,
        hasDigit: true,
        hasSymbol: true,
      }),
    );
  });

  it("Should update the strength meter width and color based on the current password", async () => {
    const user = userEvent.setup();

    render(
      <PasswordStrengthMeter
        meterColors={{
          weak: "rgb(255, 0, 0)",
          ok: "rgb(255, 165, 0)",
          good: "rgb(0, 128, 0)",
          veryGood: "rgb(0, 0, 255)",
        }}
      />,
    );

    const input = screen.getByLabelText("Password");
    const meter = screen.getByTestId("psm-meter");

    await user.type(input, "Qw7!mnOp");

    expect(meter).toHaveStyle({
      width: "75%",
      backgroundColor: "rgb(0, 128, 0)",
    });
  });

  it("Should reach 'very good' strength for a long, varied password", async () => {
    const user = userEvent.setup();
    const handlePasswordChange = vi.fn();

    render(<PasswordStrengthMeter onPasswordChange={handlePasswordChange} />);

    await user.type(screen.getByLabelText("Password"), "Qw7!mnOpXy12");

    expect(handlePasswordChange).toHaveBeenLastCalledWith(
      "Qw7!mnOpXy12",
      expect.objectContaining({
        score: 4,
        percent: 100,
        meterStatus: "very good",
      }),
    );
  });

  it("Should keep 'weak' strength for a short password regardless of character classes", async () => {
    const user = userEvent.setup();
    const handlePasswordChange = vi.fn();

    render(<PasswordStrengthMeter onPasswordChange={handlePasswordChange} />);

    await user.type(screen.getByLabelText("Password"), "Aa1!");

    expect(handlePasswordChange).toHaveBeenLastCalledWith(
      "Aa1!",
      expect.objectContaining({ meterStatus: "weak", score: 1 }),
    );
  });

  it("Should expose the meter bar with correct ARIA progressbar attributes", async () => {
    const user = userEvent.setup();

    render(<PasswordStrengthMeter />);

    const meter = screen.getByRole("progressbar", { name: "Password strength" });

    expect(meter).toHaveAttribute("aria-valuenow", "0");
    expect(meter).toHaveAttribute("aria-valuemin", "0");
    expect(meter).toHaveAttribute("aria-valuemax", "100");

    await user.type(screen.getByLabelText("Password"), "Qw7!mnOp");

    expect(meter).toHaveAttribute("aria-valuenow", "75");
  });

  it("Should render in controlled mode and reflect an external value", () => {
    render(<PasswordStrengthMeter value="Qw7!mnOp" />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const meter = screen.getByTestId("psm-meter");

    expect(input.value).toBe("Qw7!mnOp");
    expect(meter).toHaveStyle({ width: "75%" });
  });

  it("Should update the meter when the controlled value changes externally", () => {
    const { rerender } = render(<PasswordStrengthMeter value="" />);

    expect(
      screen.getByRole("progressbar", { name: "Password strength" }),
    ).toHaveAttribute("aria-valuenow", "0");

    rerender(<PasswordStrengthMeter value="Qw7!mnOpXy12" />);

    expect(
      screen.getByRole("progressbar", { name: "Password strength" }),
    ).toHaveAttribute("aria-valuenow", "100");
  });

  it("Should generate unique IDs so two instances do not conflict", () => {
    render(
      <>
        <PasswordStrengthMeter />
        <PasswordStrengthMeter />
      </>,
    );

    const inputs = screen.getAllByLabelText("Password");

    expect(inputs).toHaveLength(2);
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it("Should render translated texts and custom minimum length in the summary", () => {
    render(
      <PasswordStrengthMeter
        passwordMinLength={12}
        translation={{
          label: "Passwort",
          summaryHeaderLabel: "Anforderungen",
          summaryMinChars: "Mindestens {n} Zeichen",
          summaryCapitalLetter: "Großbuchstabe",
          summaryLowerCaseLetter: "Kleinbuchstabe",
          summaryNumber: "Zahl",
          summarySpecialChar: "Sonderzeichen",
        }}
      />,
    );

    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    expect(screen.getByText("Anforderungen")).toBeInTheDocument();
    expect(screen.getByText("Mindestens 12 Zeichen")).toBeInTheDocument();
    expect(screen.getByText("Großbuchstabe")).toBeInTheDocument();
  });

  it("Should show success icons for all fulfilled rules after a strong password is entered", async () => {
    const user = userEvent.setup();

    render(<PasswordStrengthMeter />);

    await user.type(screen.getByLabelText("Password"), "Qw7!mnOp");

    const successIcons = screen.getAllByTestId("psm-req-success");
    const failureIcons = screen.queryAllByTestId("psm-req-failure");

    expect(successIcons).toHaveLength(5);
    expect(failureIcons).toHaveLength(0);
  });

  it("Should pass a name to the native input", () => {
    render(<PasswordStrengthMeter name="newPassword" />);
    expect(screen.getByTestId("psm-input")).toHaveAttribute("name", "newPassword");
  });

  it("Should disable the input and the toggle button when disabled is true", () => {
    render(<PasswordStrengthMeter disabled />);
    expect(screen.getByTestId("psm-input")).toBeDisabled();
    expect(screen.getByTestId("psm-toggle")).toBeDisabled();
  });

  it("Should render helperText below the input", () => {
    render(<PasswordStrengthMeter error helperText="Password is required" />);
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("Should pass autoComplete to the native input", () => {
    render(<PasswordStrengthMeter autoComplete="new-password" />);
    expect(screen.getByTestId("psm-input")).toHaveAttribute("autocomplete", "new-password");
  });

  it("Should attach inputRef to the native input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<PasswordStrengthMeter inputRef={ref} />);
    expect(ref.current).toBe(screen.getByTestId("psm-input"));
  });

  it("Should hide the adornment, meter and summary blocks when configured", () => {
    render(
      <PasswordStrengthMeter
        showPasswordAdornment={false}
        showMeter={false}
        showSummary={false}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /password/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Requirements for your password"),
    ).not.toBeInTheDocument();
  });
});

describe("Password Generator", () => {
  it("Should not render the generator button by default", () => {
    render(<PasswordStrengthMeter />);
    expect(screen.queryByTestId("psm-generate")).not.toBeInTheDocument();
  });

  it("Should render the generator button when showPasswordGenerator is true", () => {
    render(<PasswordStrengthMeter showPasswordGenerator />);
    expect(screen.getByTestId("psm-generate")).toBeInTheDocument();
  });

  it("Should fill the input with a non-empty password on click", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter showPasswordGenerator />);
    await user.click(screen.getByTestId("psm-generate"));
    const input = screen.getByTestId("psm-input") as HTMLInputElement;
    expect(input.value.length).toBeGreaterThan(0);
  });

  it("Should call onPasswordChange and onPasswordGenerated on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onGenerated = vi.fn();
    render(
      <PasswordStrengthMeter
        showPasswordGenerator
        onPasswordChange={onChange}
        onPasswordGenerated={onGenerated}
      />,
    );
    await user.click(screen.getByTestId("psm-generate"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onGenerated).toHaveBeenCalledTimes(1);
    expect(typeof onGenerated.mock.calls[0][0]).toBe("string");
    expect(onGenerated.mock.calls[0][0].length).toBeGreaterThan(0);
  });

  it("Should disable the generator button when disabled is true", () => {
    render(<PasswordStrengthMeter showPasswordGenerator disabled />);
    expect(screen.getByTestId("psm-generate")).toBeDisabled();
  });

  it("Should respect generatorOptions.length", async () => {
    const user = userEvent.setup();
    const onGenerated = vi.fn();
    render(
      <PasswordStrengthMeter
        showPasswordGenerator
        generatorOptions={{ length: 24 }}
        onPasswordGenerated={onGenerated}
      />,
    );
    await user.click(screen.getByTestId("psm-generate"));
    expect(onGenerated.mock.calls[0][0].length).toBe(24);
  });
});

describe("Copy Button", () => {
  it("Should not render the copy button by default", () => {
    render(<PasswordStrengthMeter value="hunter2" />);
    expect(screen.queryByTestId("psm-copy")).not.toBeInTheDocument();
  });

  it("Should not render the copy button when the password is empty, even if enabled", () => {
    render(<PasswordStrengthMeter showCopyButton value="" />);
    expect(screen.queryByTestId("psm-copy")).not.toBeInTheDocument();
  });

  it("Should render the copy button once a password is present", () => {
    render(<PasswordStrengthMeter showCopyButton value="hunter2" />);
    expect(screen.getByTestId("psm-copy")).toBeInTheDocument();
  });

  it("Should copy the current password to the clipboard on click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(<PasswordStrengthMeter showCopyButton value="hunter2" />);
    fireEvent.click(screen.getByTestId("psm-copy"));

    expect(writeText).toHaveBeenCalledWith("hunter2");
  });

  it("Should show the copied confirmation after a successful copy", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(<PasswordStrengthMeter showCopyButton value="hunter2" />);
    fireEvent.click(screen.getByTestId("psm-copy"));

    expect(await screen.findByRole("button", { name: "Copied!" })).toBeInTheDocument();
  });

  it("Should disable the copy button when disabled is true", () => {
    render(<PasswordStrengthMeter showCopyButton disabled value="hunter2" />);
    expect(screen.getByTestId("psm-copy")).toBeDisabled();
  });

  it("Should render alongside the password generator", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter showCopyButton showPasswordGenerator />);
    expect(screen.queryByTestId("psm-copy")).not.toBeInTheDocument();
    await user.click(screen.getByTestId("psm-generate"));
    expect(screen.getByTestId("psm-copy")).toBeInTheDocument();
  });
});

describe("Confirm Field", () => {
  it("Should not render the confirm input by default", () => {
    render(<PasswordStrengthMeter />);
    expect(screen.queryByTestId("psm-confirm-input")).not.toBeInTheDocument();
  });

  it("Should render the confirm input when showConfirmField is true", () => {
    render(<PasswordStrengthMeter showConfirmField />);
    expect(screen.getByTestId("psm-confirm-input")).toBeInTheDocument();
  });

  it("Should show match icon when passwords are identical", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter showConfirmField value="MySecret1!" />);
    await user.type(screen.getByTestId("psm-confirm-input"), "MySecret1!");
    expect(screen.getByTestId("psm-confirm-match")).toBeInTheDocument();
  });

  it("Should show mismatch icon when passwords differ", async () => {
    const user = userEvent.setup();
    render(<PasswordStrengthMeter showConfirmField value="MySecret1!" />);
    await user.type(screen.getByTestId("psm-confirm-input"), "Other");
    expect(screen.getByTestId("psm-confirm-mismatch")).toBeInTheDocument();
  });

  it("Should call onConfirmChange with matches=true when passwords match", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <PasswordStrengthMeter showConfirmField value="Abc123!" onConfirmChange={handler} />,
    );
    await user.type(screen.getByTestId("psm-confirm-input"), "Abc123!");
    const lastCall = handler.mock.calls.at(-1);
    expect(lastCall?.[0]).toBe("Abc123!");
    expect(lastCall?.[1]).toBe(true);
  });

  it("Should call onConfirmChange with matches=false when passwords differ", async () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    render(
      <PasswordStrengthMeter showConfirmField value="Abc123!" onConfirmChange={handler} />,
    );
    await user.type(screen.getByTestId("psm-confirm-input"), "Wrong");
    const lastCall = handler.mock.calls.at(-1);
    expect(lastCall?.[1]).toBe(false);
  });

  it("Should not show match/mismatch icon when confirm field is empty", () => {
    render(<PasswordStrengthMeter showConfirmField value="Abc123!" />);
    expect(screen.queryByTestId("psm-confirm-match")).not.toBeInTheDocument();
    expect(screen.queryByTestId("psm-confirm-mismatch")).not.toBeInTheDocument();
  });
});
