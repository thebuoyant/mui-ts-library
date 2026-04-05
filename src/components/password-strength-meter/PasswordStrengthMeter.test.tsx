import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import type { StrengthResult } from "../../util/password-strength.util";

describe("PasswordStrengthMeter", () => {
  it("renders the password input with default label", () => {
    render(<PasswordStrengthMeter />);

    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByText("Requirements for your password"),
    ).toBeInTheDocument();
  });

  it("renders a custom label from translation", () => {
    render(
      <PasswordStrengthMeter
        translation={{
          label: "Passwort",
          summaryHeaderLabel: "Anforderungen",
          summaryMinCharsLeft: "Mindestens",
          summaryMinCharsRight: "Zeichen",
          summaryCapitalLetter: "Mindestens 1 Großbuchstabe",
          summaryLowerCaseLetter: "Mindestens 1 Kleinbuchstabe",
          summaryNumber: "Mindestens 1 Zahl",
          summarySpecialChar: "Mindestens 1 Sonderzeichen",
        }}
      />,
    );

    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    expect(screen.getByText("Anforderungen")).toBeInTheDocument();
  });

  it("updates the input value when the user types", () => {
    render(<PasswordStrengthMeter />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "MyPassword123!" } });

    expect(input.value).toBe("MyPassword123!");
  });

  it("calls onPasswordChange with password and strengthResult", () => {
    const handlePasswordChange =
      vi.fn<(password: string, strengthResult: StrengthResult) => void>();

    render(<PasswordStrengthMeter onPasswordChange={handlePasswordChange} />);

    const input = screen.getByLabelText("Password");

    fireEvent.change(input, { target: { value: "Abc123!!" } });

    expect(handlePasswordChange).toHaveBeenCalledTimes(1);

    expect(handlePasswordChange).toHaveBeenCalledWith(
      "Abc123!!",
      expect.objectContaining({
        length: 8,
        hasUpper: true,
        hasLower: true,
        hasDigit: true,
        hasSymbol: true,
      }),
    );
  });

  it("toggles password visibility when clicking the adornment button", () => {
    render(<PasswordStrengthMeter />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByLabelText("Show password");

    expect(input.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(input.type).toBe("text");

    fireEvent.click(screen.getByLabelText("Hide password"));
    expect(input.type).toBe("password");
  });

  it("does not render the visibility button when showPasswordAdornment is false", () => {
    render(<PasswordStrengthMeter showPasswordAdornment={false} />);

    expect(screen.queryByLabelText("Show password")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Hide password")).not.toBeInTheDocument();
  });

  it("renders the meter only when showMeter is true", () => {
    const { container, rerender } = render(
      <PasswordStrengthMeter showMeter={true} />,
    );

    expect(container.querySelector(".meter-wrapper")).toBeInTheDocument();

    rerender(<PasswordStrengthMeter showMeter={false} />);

    expect(container.querySelector(".meter-wrapper")).not.toBeInTheDocument();
  });

  it("updates requirement state after typing a strong password", () => {
    render(<PasswordStrengthMeter passwordMinLength={8} />);

    const input = screen.getByLabelText("Password");

    fireEvent.change(input, { target: { value: "Abcdef12!" } });

    expect(screen.getByText(/At least 1 capital letter/i)).toBeInTheDocument();
    expect(
      screen.getByText(/At least 1 lowercase letter/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/At least 1 number/i)).toBeInTheDocument();
    expect(
      screen.getByText(/At least 1 special character/i),
    ).toBeInTheDocument();
  });

  it("uses the provided passwordMinLength in the summary text", () => {
    render(<PasswordStrengthMeter passwordMinLength={12} />);

    expect(screen.getByText(/At least 12 characters/i)).toBeInTheDocument();
  });
});
