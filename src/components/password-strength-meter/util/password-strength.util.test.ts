import { describe, expect, it } from "vitest";
import { scorePassword } from "./password-strength.util";

describe("scorePassword", () => {
  it("returns a weak empty result for an empty password", () => {
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

  it("keeps short passwords weak even when several character classes exist", () => {
    const result = scorePassword("Aa1!", 8);

    expect(result).toMatchObject({
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

  it("returns ok for a password that meets the minimum length with two classes", () => {
    const result = scorePassword("abcdefgh", 8);

    expect(result.score).toBe(2);
    expect(result.percent).toBe(50);
    expect(result.meterStatus).toBe("ok");
    expect(result.hasLower).toBe(true);
  });

  it("returns good for a password with at least three character classes", () => {
    const result = scorePassword("Abcdefg1", 8);

    expect(result.score).toBe(3);
    expect(result.percent).toBe(75);
    expect(result.meterStatus).toBe("good");
  });

  it("returns very good for a longer password with multiple character classes", () => {
    const result = scorePassword("Abcdefg1!XYZ", 8);

    expect(result.score).toBe(4);
    expect(result.percent).toBe(100);
    expect(result.meterStatus).toBe("very good");
  });

  it("penalizes repeated characters heavily", () => {
    const result = scorePassword("AAAAAAAAAAAA", 8);

    expect(result.score).toBe(0);
    expect(result.percent).toBe(0);
    expect(result.meterStatus).toBe("weak");
  });

  it("penalizes common patterns like 1234", () => {
    const result = scorePassword("Abcd1234!", 8);

    expect(result.score).toBe(2);
    expect(result.percent).toBe(50);
    expect(result.meterStatus).toBe("ok");
  });

  it("penalizes common german patterns like passwort", () => {
    const result = scorePassword("MeinPasswort123!", 8);

    expect(result.score).toBe(2);
    expect(result.meterStatus).toBe("ok");
  });

  it("clamps the score to the allowed range", () => {
    expect(scorePassword("A".repeat(30), 8).score).toBe(0);
    expect(scorePassword("VeryStrongPassword123!@#", 8).score).toBe(4);
  });

  it("treats nullish input safely as an empty password", () => {
    const result = scorePassword(undefined as never, 8);

    expect(result).toMatchObject({
      score: 0,
      percent: 0,
      meterStatus: "weak",
      length: 0,
    });
  });
});
