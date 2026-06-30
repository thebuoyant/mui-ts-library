import { describe, expect, it } from "vitest";
import {
  clamp,
  formatHslString,
  formatRgbString,
  getContrastTextColor,
  hexToRgba,
  hslaToHsva,
  hslToRgb,
  hsvaToHsla,
  hsvaToRgba,
  hsvToRgb,
  parseColorString,
  rgbaToHex,
  rgbaToHsva,
  rgbToHsl,
  rgbToHsv,
} from "./colorConversion.util";

describe("clamp", () => {
  it("Should pass through values already within range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("Should clamp values below the minimum", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
  });

  it("Should clamp values above the maximum", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });
});

describe("hexToRgba / rgbaToHex round-trip", () => {
  it("Should parse a 6-digit hex", () => {
    expect(hexToRgba("#ff0000")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("Should parse a 3-digit shorthand hex", () => {
    expect(hexToRgba("#f00")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("Should parse an 8-digit hex with alpha", () => {
    expect(hexToRgba("#ff000080")).toEqual({ r: 255, g: 0, b: 0, a: expect.closeTo(0.502, 2) });
  });

  it("Should parse a 4-digit shorthand hex with alpha", () => {
    expect(hexToRgba("#f00f")).toEqual({ r: 255, g: 0, b: 0, a: 1 });
  });

  it("Should return null for an unparseable string", () => {
    expect(hexToRgba("#zzz")).toBeNull();
    expect(hexToRgba("#12345")).toBeNull();
  });

  it("Should format an opaque color without an alpha suffix", () => {
    expect(rgbaToHex({ r: 255, g: 0, b: 0, a: 1 })).toBe("#ff0000");
  });

  it("Should format a translucent color with an alpha suffix", () => {
    expect(rgbaToHex({ r: 255, g: 0, b: 0, a: 0.5 })).toBe("#ff000080");
  });

  it("Should round-trip hex -> rgba -> hex for an opaque color", () => {
    expect(rgbaToHex(hexToRgba("#1976d2")!)).toBe("#1976d2");
  });
});

describe("hsvToRgb / rgbToHsv round-trip", () => {
  it("Should convert pure red", () => {
    expect(hsvToRgb(0, 100, 100)).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("Should convert pure green", () => {
    const { r, g, b } = hsvToRgb(120, 100, 100);
    expect(Math.round(r)).toBe(0);
    expect(Math.round(g)).toBe(255);
    expect(Math.round(b)).toBe(0);
  });

  it("Should convert white (s=0)", () => {
    const { r, g, b } = hsvToRgb(0, 0, 100);
    expect([Math.round(r), Math.round(g), Math.round(b)]).toEqual([255, 255, 255]);
  });

  it("Should convert black (v=0)", () => {
    const { r, g, b } = hsvToRgb(0, 100, 0);
    expect([Math.round(r), Math.round(g), Math.round(b)]).toEqual([0, 0, 0]);
  });

  it("Should round-trip rgbToHsv(hsvToRgb(...))", () => {
    const rgb = hsvToRgb(210, 80, 60);
    const hsv = rgbToHsv(Math.round(rgb.r), Math.round(rgb.g), Math.round(rgb.b));
    expect(Math.round(hsv.h)).toBeCloseTo(210, -1);
    expect(Math.round(hsv.s)).toBeCloseTo(80, -1);
    expect(Math.round(hsv.v)).toBeCloseTo(60, -1);
  });
});

describe("hslToRgb / rgbToHsl round-trip", () => {
  it("Should convert pure red", () => {
    const { r, g, b } = hslToRgb(0, 100, 50);
    expect([Math.round(r), Math.round(g), Math.round(b)]).toEqual([255, 0, 0]);
  });

  it("Should convert gray (s=0)", () => {
    const { r, g, b } = hslToRgb(0, 0, 50);
    expect(Math.round(r)).toBe(Math.round(g));
    expect(Math.round(g)).toBe(Math.round(b));
  });

  it("Should round-trip rgbToHsl(hslToRgb(...))", () => {
    const rgb = hslToRgb(280, 60, 40);
    const hsl = rgbToHsl(Math.round(rgb.r), Math.round(rgb.g), Math.round(rgb.b));
    expect(Math.round(hsl.h)).toBeCloseTo(280, -1);
    expect(Math.round(hsl.s)).toBeCloseTo(60, -1);
    expect(Math.round(hsl.l)).toBeCloseTo(40, -1);
  });
});

describe("hsva <-> rgba <-> hsla bridges", () => {
  it("Should preserve alpha through hsvaToRgba", () => {
    expect(hsvaToRgba({ h: 0, s: 100, v: 100, a: 0.4 })).toEqual({ r: 255, g: 0, b: 0, a: 0.4 });
  });

  it("Should preserve alpha through rgbaToHsva", () => {
    expect(rgbaToHsva({ r: 255, g: 0, b: 0, a: 0.4 }).a).toBe(0.4);
  });

  it("Should preserve alpha through hsvaToHsla and hslaToHsva round-trip", () => {
    const hsva = { h: 210, s: 80, v: 60, a: 0.7 };
    const hsla = hsvaToHsla(hsva);
    expect(hsla.a).toBe(0.7);
    const back = hslaToHsva(hsla);
    expect(Math.round(back.h)).toBeCloseTo(hsva.h, -1);
    expect(back.a).toBe(0.7);
  });
});

describe("parseColorString", () => {
  it("Should parse a hex string", () => {
    expect(parseColorString("#1976d2")).toEqual({ r: 0x19, g: 0x76, b: 0xd2, a: 1 });
  });

  it("Should parse an rgb() string", () => {
    expect(parseColorString("rgb(25, 118, 210)")).toEqual({ r: 25, g: 118, b: 210, a: 1 });
  });

  it("Should parse an rgba() string", () => {
    expect(parseColorString("rgba(25, 118, 210, 0.5)")).toEqual({ r: 25, g: 118, b: 210, a: 0.5 });
  });

  it("Should parse an hsl() string", () => {
    const result = parseColorString("hsl(0, 100%, 50%)");
    expect(result).not.toBeNull();
    expect(result!.r).toBe(255);
  });

  it("Should parse an hsla() string with alpha", () => {
    const result = parseColorString("hsla(0, 100%, 50%, 0.3)");
    expect(result!.a).toBe(0.3);
  });

  it("Should return null for garbage input", () => {
    expect(parseColorString("not-a-color")).toBeNull();
  });
});

describe("formatRgbString / formatHslString", () => {
  it("Should format an opaque rgb without alpha", () => {
    expect(formatRgbString({ r: 25, g: 118, b: 210, a: 1 })).toBe("rgb(25, 118, 210)");
  });

  it("Should format a translucent rgba with alpha", () => {
    expect(formatRgbString({ r: 25, g: 118, b: 210, a: 0.5 })).toBe("rgba(25, 118, 210, 0.5)");
  });

  it("Should format an opaque hsl without alpha", () => {
    expect(formatHslString({ h: 210, s: 79, l: 46, a: 1 })).toBe("hsl(210, 79%, 46%)");
  });

  it("Should format a translucent hsla with alpha", () => {
    expect(formatHslString({ h: 210, s: 79, l: 46, a: 0.5 })).toBe("hsla(210, 79%, 46%, 0.5)");
  });
});

describe("getContrastTextColor", () => {
  it("Should return black text for a light background", () => {
    expect(getContrastTextColor(255, 255, 255)).toBe("#000000");
  });

  it("Should return white text for a dark background", () => {
    expect(getContrastTextColor(0, 0, 0)).toBe("#ffffff");
  });
});
