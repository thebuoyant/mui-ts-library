import { describe, expect, it } from "vitest";
import { scorePassword } from "./password-strength.util";

describe("scorePassword", () => {
  it("Should return a weak empty result for an empty password", () => {
    expect(scorePassword("", 8)).toEqual({
      score: 0,
      percent: 0,
      meterStatus: "weak",
      length: 0,
      hasLower: false,
      hasUpper: false,
      hasDigit: false,
      hasSymbol: false,
    });
  });

  it("Should keep short passwords weak even when several character classes exist", () => {
    const result = scorePassword("Aa1!", 8);

    expect(result).toEqual({
      score: 1,
      percent: 25,
      meterStatus: "weak",
      length: 4,
      hasLower: true,
      hasUpper: true,
      hasDigit: true,
      hasSymbol: true,
    });
  });

  it("Should return ok for a password that meets the minimum length with two character classes", () => {
    const result = scorePassword("Abefghij", 8);

    expect(result.score).toBe(2);
    expect(result.percent).toBe(50);
    expect(result.meterStatus).toBe("ok");
    expect(result.length).toBe(8);
    expect(result.hasLower).toBe(true);
    expect(result.hasUpper).toBe(true);
    expect(result.hasDigit).toBe(false);
    expect(result.hasSymbol).toBe(false);
  });

  it("Should return good for a password with at least three character classes and without banned patterns", () => {
    const result = scorePassword("Qw7!mnOp", 8);

    expect(result.score).toBe(3);
    expect(result.percent).toBe(75);
    expect(result.meterStatus).toBe("good");
    expect(result.hasLower).toBe(true);
    expect(result.hasUpper).toBe(true);
    expect(result.hasDigit).toBe(true);
    expect(result.hasSymbol).toBe(true);
  });

  it("Should return very good for a longer password with multiple character classes", () => {
    const result = scorePassword("Qw7!mnOpXy12", 8);

    expect(result.score).toBe(4);
    expect(result.percent).toBe(100);
    expect(result.meterStatus).toBe("very good");
  });

  it("Should penalize repeated characters heavily", () => {
    const result = scorePassword("AAAAAAAAAAAA", 8);

    expect(result.score).toBe(0);
    expect(result.percent).toBe(0);
    expect(result.meterStatus).toBe("weak");
  });

  it("Should penalize common patterns like 1234", () => {
    const result = scorePassword("Qw!9Lm1234Xy", 8);

    expect(result.score).toBe(2);
    expect(result.percent).toBe(50);
    expect(result.meterStatus).toBe("ok");
  });

  it("Should penalize common german patterns like passwort", () => {
    const result = scorePassword("MeinPasswort123!", 8);

    expect(result.score).toBe(2);
    expect(result.percent).toBe(50);
    expect(result.meterStatus).toBe("ok");
  });

  it("Should clamp the score to the allowed range", () => {
    expect(scorePassword("A".repeat(30), 8).score).toBe(0);
    expect(scorePassword("Qw7!mnOpXy12", 8).score).toBe(4);
  });

  it("Should treat nullish input safely as an empty password", () => {
    const result = scorePassword(undefined as never, 8);

    expect(result).toMatchObject({
      score: 0,
      percent: 0,
      meterStatus: "weak",
      length: 0,
    });
  });
});
