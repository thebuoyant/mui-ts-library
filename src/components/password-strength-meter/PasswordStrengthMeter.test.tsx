import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    const meter = document.querySelector(".meter-result") as HTMLDivElement;

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
    const meter = document.querySelector(".meter-result") as HTMLDivElement;

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
          summaryMinCharsLeft: "Mindestens",
          summaryMinCharsRight: "Zeichen",
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

    const successIcons = document.querySelectorAll(
      '[data-testid="CheckCircleOutlineIcon"]',
    );
    const failureIcons = document.querySelectorAll(
      '[data-testid="ErrorOutlineIcon"]',
    );

    expect(successIcons.length).toBe(5);
    expect(failureIcons.length).toBe(0);
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
