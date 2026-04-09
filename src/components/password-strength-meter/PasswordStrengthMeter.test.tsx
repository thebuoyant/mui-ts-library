import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

describe("PasswordStrengthMeter", () => {
  it("renders with its default label and hidden password input", () => {
    render(<PasswordStrengthMeter />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.type).toBe("password");
    expect(
      screen.getByText("Requirements for your password"),
    ).toBeInTheDocument();
  });

  it("toggles the password visibility when the adornment button is clicked", async () => {
    const user = userEvent.setup();

    render(<PasswordStrengthMeter />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: "Show password" });

    await user.click(toggleButton);
    expect(input.type).toBe("text");
    expect(
      screen.getByRole("button", { name: "Hide password" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input.type).toBe("password");
  });

  it("calls onPasswordChange with the typed password and calculated result", async () => {
    const user = userEvent.setup();
    const handlePasswordChange = vi.fn();

    render(<PasswordStrengthMeter onPasswordChange={handlePasswordChange} />);

    const input = screen.getByLabelText("Password");
    await user.type(input, "Abcd1234!");

    expect(handlePasswordChange).toHaveBeenCalled();
    expect(handlePasswordChange).toHaveBeenLastCalledWith(
      "Abcd1234!",
      expect.objectContaining({
        meterStatus: "ok",
        score: 2,
        percent: 50,
        hasUpper: true,
        hasLower: true,
        hasDigit: true,
        hasSymbol: true,
      }),
    );
  });

  it("updates the strength meter width and color based on the current password", async () => {
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

    await user.type(input, "Abcdefg1");

    expect(meter).toHaveStyle({
      width: "75%",
      backgroundColor: "rgb(0, 128, 0)",
    });
  });

  it("renders translated texts and custom minimum length in the summary", () => {
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

  it("shows success icons for fulfilled rules and failure icons for open rules", async () => {
    const user = userEvent.setup();

    render(<PasswordStrengthMeter />);

    await user.type(screen.getByLabelText("Password"), "Abcd1234!");

    const successIcons = document.querySelectorAll(
      '[data-testid="CheckCircleOutlineIcon"]',
    );
    const failureIcons = document.querySelectorAll(
      '[data-testid="ErrorOutlineIcon"]',
    );

    expect(successIcons.length).toBe(5);
    expect(failureIcons.length).toBe(0);
  });

  it("can hide the adornment, meter and summary blocks", () => {
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
    expect(document.querySelector(".meter-wrapper")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Requirements for your password"),
    ).not.toBeInTheDocument();
  });
});
