export type RgbaColor = { r: number; g: number; b: number; a: number };
export type HsvaColor = { h: number; s: number; v: number; a: number };
export type HslaColor = { h: number; s: number; l: number; a: number };

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function componentToHex(c: number): string {
  return clamp(Math.round(c), 0, 255).toString(16).padStart(2, "0");
}

export function rgbaToHex({ r, g, b, a }: RgbaColor): string {
  const hex = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  return a < 1 ? `${hex}${componentToHex(a * 255)}` : hex;
}

export function hexToRgba(hex: string): RgbaColor | null {
  const cleaned = hex.trim().replace(/^#/, "");
  let r: number, g: number, b: number, a = 1;

  if (cleaned.length === 3 || cleaned.length === 4) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
    if (cleaned.length === 4) a = parseInt(cleaned[3] + cleaned[3], 16) / 255;
  } else if (cleaned.length === 6 || cleaned.length === 8) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
    if (cleaned.length === 8) a = parseInt(cleaned.slice(6, 8), 16) / 255;
  } else {
    return null;
  }

  if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
  return { r, g, b, a };
}

// h: 0-360, s/v: 0-100
export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const sN = s / 100;
  const vN = v / 100;
  const c = vN * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vN - c;
  const [r, g, b] =
    h < 60   ? [c, x, 0] :
    h < 120  ? [x, c, 0] :
    h < 180  ? [0, c, x] :
    h < 240  ? [0, x, c] :
    h < 300  ? [x, 0, c] :
               [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

export function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rN = r / 255, gN = g / 255, bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === rN) h = 60 * (((gN - bN) / d) % 6);
    else if (max === gN) h = 60 * ((bN - rN) / d + 2);
    else h = 60 * ((rN - gN) / d + 4);
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : d / max;
  return { h, s: s * 100, v: max * 100 };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sN = s / 100, lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  const [r, g, b] =
    h < 60   ? [c, x, 0] :
    h < 120  ? [x, c, 0] :
    h < 180  ? [0, c, x] :
    h < 240  ? [0, x, c] :
    h < 300  ? [x, 0, c] :
               [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rN = r / 255, gN = g / 255, bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const l = (max + min) / 2;
  const d = max - min;

  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rN) h = 60 * (((gN - bN) / d) % 6);
    else if (max === gN) h = 60 * ((bN - rN) / d + 2);
    else h = 60 * ((rN - gN) / d + 4);
  }
  if (h < 0) h += 360;

  return { h, s: s * 100, l: l * 100 };
}

export function hsvaToRgba({ h, s, v, a }: HsvaColor): RgbaColor {
  const { r, g, b } = hsvToRgb(h, s, v);
  return { r, g, b, a };
}

export function rgbaToHsva({ r, g, b, a }: RgbaColor): HsvaColor {
  const { h, s, v } = rgbToHsv(r, g, b);
  return { h, s, v, a };
}

export function hsvaToHsla({ h, s, v, a }: HsvaColor): HslaColor {
  const { r, g, b } = hsvToRgb(h, s, v);
  const hsl = rgbToHsl(r, g, b);
  return { ...hsl, a };
}

export function hslaToHsva({ h, s, l, a }: HslaColor): HsvaColor {
  const { r, g, b } = hslToRgb(h, s, l);
  const hsv = rgbToHsv(r, g, b);
  return { ...hsv, a };
}

/** Accepts #hex (3/4/6/8 digits), rgb()/rgba(), and hsl()/hsla() — returns null when unparseable. */
export function parseColorString(input: string): RgbaColor | null {
  const trimmed = input.trim();
  if (trimmed.startsWith("#")) return hexToRgba(trimmed);

  const rgbMatch = trimmed.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
      a: rgbMatch[4] !== undefined ? Number(rgbMatch[4]) : 1,
    };
  }

  const hslMatch = trimmed.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (hslMatch) {
    const { r, g, b } = hslToRgb(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]));
    return { r, g, b, a: hslMatch[4] !== undefined ? Number(hslMatch[4]) : 1 };
  }

  return null;
}

export function formatRgbString({ r, g, b, a }: RgbaColor): string {
  const [rr, gg, bb] = [r, g, b].map((c) => Math.round(c));
  return a < 1 ? `rgba(${rr}, ${gg}, ${bb}, ${Math.round(a * 100) / 100})` : `rgb(${rr}, ${gg}, ${bb})`;
}

export function formatHslString({ h, s, l, a }: HslaColor): string {
  const [hh, ss, ll] = [h, s, l].map((c) => Math.round(c));
  return a < 1 ? `hsla(${hh}, ${ss}%, ${ll}%, ${Math.round(a * 100) / 100})` : `hsl(${hh}, ${ss}%, ${ll}%)`;
}

/** WCAG-style luminance heuristic — picks black or white text for readable contrast on a given background. */
export function getContrastTextColor(r: number, g: number, b: number): "#000000" | "#ffffff" {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#000000" : "#ffffff";
}
