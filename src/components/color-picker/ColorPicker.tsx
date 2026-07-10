import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Box, IconButton, MenuItem, Select, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import ColorizeIcon from "@mui/icons-material/Colorize";
import {
  clamp,
  hsvaToHsla,
  hsvaToRgba,
  hexToRgba,
  parseColorString,
  rgbaToHex,
  rgbaToHsva,
  hslaToHsva,
  type HsvaColor,
} from "./util/colorConversion.util";
import {
  DEFAULT_COLOR_PICKER_TRANSLATION,
  type ColorPickerColorInfo,
  type ColorPickerFormat,
  type ColorPickerProps,
} from "./ColorPicker.types";

// EyeDropper isn't in TS's DOM lib yet (Chromium-only API, Safari/Firefox unsupported as of writing).
declare global {
  interface Window {
    EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> };
  }
}

// A plain `${pct}%` thumb position lets the thumb's own radius push it past the track edge at
// 0%/100% (the thumb is centered ON that position, not contained within it). Insetting by half
// the thumb size keeps it fully within the track at both ends.
function thumbPosition(pct: number, thumbSize: number): string {
  const clamped = clamp(pct, 0, 100);
  return `calc(${thumbSize / 2}px + (100% - ${thumbSize}px) * ${clamped / 100})`;
}

function buildColorInfo(hsva: HsvaColor): { hex: string; info: ColorPickerColorInfo } {
  const rgba = hsvaToRgba(hsva);
  const hsla = hsvaToHsla(hsva);
  const hex = rgbaToHex(rgba);
  return {
    hex,
    info: {
      hex,
      rgb: { r: Math.round(rgba.r), g: Math.round(rgba.g), b: Math.round(rgba.b), a: rgba.a },
      hsl: { h: Math.round(hsla.h), s: Math.round(hsla.s), l: Math.round(hsla.l), a: hsla.a },
    },
  };
}

// Controlled with a local draft buffer — commits on every valid keystroke, but lets the user
// type freely (e.g. briefly clear the field) without each render snapping the text back.
function NumberField({
  value, onCommit, min, max, label, disabled, size, onBlurExtra, fullWidth,
}: {
  value: number; onCommit: (n: number) => void; min: number; max: number;
  label: string; disabled?: boolean; size: "small" | "medium"; onBlurExtra?: () => void;
  // MUI's outlined input keeps ~14px horizontal padding on each side regardless of `size` —
  // a fixed width has to leave room for that or 3-digit values ("100", "255", "360") clip.
  fullWidth?: boolean;
}) {
  const [draft, setDraft] = useState(String(Math.round(value)));
  useEffect(() => { setDraft(String(Math.round(value))); }, [value]);

  return (
    <TextField
      size={size}
      value={draft}
      disabled={disabled}
      onChange={(e) => {
        const next = e.target.value;
        setDraft(next);
        const n = Number(next);
        if (next.trim() !== "" && !Number.isNaN(n)) onCommit(clamp(n, min, max));
      }}
      onBlur={() => { setDraft(String(Math.round(value))); onBlurExtra?.(); }}
      slotProps={{ htmlInput: { "aria-label": label, style: { textAlign: "center" } } }}
      sx={fullWidth ? { flex: 1, minWidth: 0 } : { width: 64, flexShrink: 0 }}
    />
  );
}

export function ColorPicker({
  value,
  onChange,
  onChangeCommitted,
  defaultFormat = "hex",
  format: formatProp,
  onFormatChange,
  showAlpha = true,
  showEyeDropper = true,
  showSliderSection = true,
  showInputSection = true,
  savedColors,
  disabled = false,
  colorGradientSize = "medium",
  inputSize = "medium",
  width = 280,
  name,
  translation,
}: ColorPickerProps) {
  const theme = useTheme();
  const t = { ...DEFAULT_COLOR_PICKER_TRANSLATION, ...translation };

  const [hsva, setHsva] = useState<HsvaColor>(() => {
    const parsed = parseColorString(value);
    return parsed ? rgbaToHsva(parsed) : { h: 0, s: 0, v: 0, a: 1 };
  });
  const [internalFormat, setInternalFormat] = useState<ColorPickerFormat>(defaultFormat);
  const activeFormat = formatProp ?? internalFormat;

  // Re-syncs from `value` only when it actually differs from the string this component itself
  // last produced — so feeding our own onChange output straight back in via a parent's state
  // doesn't re-quantize hue/saturation through a hex round-trip on every keystroke/drag frame.
  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setPrevValue(value);
    const parsed = parseColorString(value);
    if (parsed) setHsva(rgbaToHsva(parsed));
  }

  const { hex, info } = buildColorInfo(hsva);
  const hexNoAlpha = hex.slice(0, 7);
  const [hexDraft, setHexDraft] = useState(hexNoAlpha);
  useEffect(() => { setHexDraft(hexNoAlpha); }, [hexNoAlpha]);

  const gradientRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);

  const updateHsva = (next: HsvaColor) => {
    setHsva(next);
    const built = buildColorInfo(next);
    setPrevValue(built.hex); // avoid the next render's prop-sync effectively re-parsing our own output
    onChange(built.hex, built.info);
  };

  // For atomic, single-step actions (swatch click, eyedropper) — fires onChangeCommitted
  // immediately alongside onChange, since there's no separate drag/typing phase to defer past.
  const commitHsva = (next: HsvaColor) => {
    updateHsva(next);
    if (onChangeCommitted) {
      const built = buildColorInfo(next);
      onChangeCommitted(built.hex, built.info);
    }
  };

  // For drag (pointer-up) and typing (blur) — fires once the "gesture" ends, reading the
  // current hsva from this render's closure rather than re-deriving it from another source.
  const fireCommitted = () => {
    if (!onChangeCommitted) return;
    const built = buildColorInfo(hsva);
    onChangeCommitted(built.hex, built.info);
  };

  const gradientHeight = colorGradientSize === "small" ? 130 : 160;
  const swatchSize = colorGradientSize === "small" ? 20 : 24;
  const trackThickness = colorGradientSize === "small" ? 10 : 12;
  const thumbSize = colorGradientSize === "small" ? 13 : 16;

  const handleGradientPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || !gradientRef.current) return;
    const rect = gradientRef.current.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);
    updateHsva({ ...hsva, s: (x / rect.width) * 100, v: 100 - (y / rect.height) * 100 });
  };

  const handleHuePointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || !hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    updateHsva({ ...hsva, h: (x / rect.width) * 360 });
  };

  const handleAlphaPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || !alphaRef.current) return;
    const rect = alphaRef.current.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    updateHsva({ ...hsva, a: x / rect.width });
  };

  const eyeDropperSupported = typeof window !== "undefined" && !!window.EyeDropper;
  const handleEyeDropper = async () => {
    if (disabled || !window.EyeDropper) return;
    try {
      const result = await new window.EyeDropper().open();
      const parsed = hexToRgba(result.sRGBHex);
      if (parsed) commitHsva(rgbaToHsva({ ...parsed, a: hsva.a }));
    } catch {
      // User cancelled (Escape) — nothing to do.
    }
  };

  const handleFormatChange = (next: ColorPickerFormat) => {
    if (formatProp === undefined) setInternalFormat(next);
    onFormatChange?.(next);
  };

  const rgba = hsvaToRgba(hsva);
  const hsla = hsvaToHsla(hsva);
  const opaqueHex = hexNoAlpha;

  const checkeredBackground = {
    backgroundImage:
      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), " +
      "linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
    backgroundSize: "8px 8px",
    backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
  };

  return (
    <Box
      sx={{
        width,
        opacity: disabled ? 0.6 : 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        ref={gradientRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={t.gradientAreaLabel}
        aria-valuetext={`${Math.round(hsva.s)}, ${Math.round(hsva.v)}`}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); handleGradientPointer(e); }}
        onPointerMove={(e) => { if (e.buttons === 1) handleGradientPointer(e); }}
        onPointerUp={fireCommitted}
        sx={{
          position: "relative",
          width: "100%",
          height: gradientHeight,
          borderRadius: `${theme.shape.borderRadius}px`,
          border: `1px solid ${theme.palette.divider}`,
          cursor: disabled ? "default" : "crosshair",
          touchAction: "none",
          background:
            `linear-gradient(to top, #000, rgba(0,0,0,0)), ` +
            `linear-gradient(to right, #fff, hsl(${hsva.h}, 100%, 50%))`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: thumbPosition(hsva.s, thumbSize),
            top: thumbPosition(100 - hsva.v, thumbSize),
            width: thumbSize,
            height: thumbSize,
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            backgroundColor: opaqueHex,
          }}
        />
      </Box>

      {showSliderSection && (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {showEyeDropper && eyeDropperSupported && (
          <Tooltip title={t.eyeDropperLabel}>
            <span>
              <IconButton
                size="small"
                onClick={handleEyeDropper}
                disabled={disabled}
                aria-label={t.eyeDropperLabel}
              >
                <ColorizeIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
          <Box
            ref={hueRef}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={t.hueSliderLabel}
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(hsva.h)}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); handleHuePointer(e); }}
            onPointerMove={(e) => { if (e.buttons === 1) handleHuePointer(e); }}
            onPointerUp={fireCommitted}
            sx={{
              position: "relative",
              width: "100%",
              height: trackThickness,
              borderRadius: trackThickness,
              cursor: disabled ? "default" : "pointer",
              touchAction: "none",
              background: "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: thumbPosition((hsva.h / 360) * 100, thumbSize),
                top: "50%",
                width: thumbSize,
                height: thumbSize,
                borderRadius: "50%",
                border: "2px solid #fff",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                backgroundColor: `hsl(${hsva.h}, 100%, 50%)`,
              }}
            />
          </Box>

          {showAlpha && (
            <Box
              ref={alphaRef}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-label={t.alphaFieldLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(hsva.a * 100)}
              onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); handleAlphaPointer(e); }}
              onPointerMove={(e) => { if (e.buttons === 1) handleAlphaPointer(e); }}
              onPointerUp={fireCommitted}
              sx={{
                position: "relative",
                width: "100%",
                height: trackThickness,
                borderRadius: trackThickness,
                cursor: disabled ? "default" : "pointer",
                touchAction: "none",
                ...checkeredBackground,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: trackThickness,
                  background: `linear-gradient(to right, transparent, ${opaqueHex})`,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  left: thumbPosition(hsva.a * 100, thumbSize),
                  top: "50%",
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  backgroundColor: opaqueHex,
                }}
              />
            </Box>
          )}
        </Box>
      </Box>
      )}

      {showInputSection && (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        {/* Row 1: format selector, hex field (HEX format only), and alpha — RGB/HSL's three
            fields get their own full-width row below instead of squeezing in here, so none
            of these fields are narrow enough to clip their own content (e.g. "100", "255"). */}
        <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
          <Select
            size={inputSize}
            value={activeFormat}
            aria-label={t.formatLabel}
            disabled={disabled}
            onChange={(e) => handleFormatChange(e.target.value as ColorPickerFormat)}
            sx={{ minWidth: 80, flexShrink: 0 }}
          >
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="hsl">HSL</MenuItem>
          </Select>

          {activeFormat === "hex" && (
            <TextField
              size={inputSize}
              value={hexDraft}
              disabled={disabled}
              onChange={(e) => {
                const next = e.target.value;
                setHexDraft(next);
                const parsed = hexToRgba(next);
                if (parsed) updateHsva(rgbaToHsva({ ...parsed, a: hsva.a }));
              }}
              onBlur={() => { setHexDraft(hexNoAlpha); fireCommitted(); }}
              slotProps={{ htmlInput: { "aria-label": t.hexFieldLabel } }}
              sx={{ flex: 1, minWidth: 0 }}
            />
          )}

          {activeFormat !== "hex" && <Box sx={{ flex: 1 }} />}

          {showAlpha && (
            <NumberField label={t.alphaFieldLabel} value={Math.round(hsva.a * 100)} min={0} max={100} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted}
              onCommit={(a) => updateHsva({ ...hsva, a: a / 100 })} />
          )}
        </Box>

        {activeFormat === "rgb" && (
          <Box sx={{ display: "flex", gap: 0.75 }}>
            <NumberField label={t.redLabel} value={rgba.r} min={0} max={255} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted} fullWidth
              onCommit={(r) => updateHsva(rgbaToHsva({ r, g: rgba.g, b: rgba.b, a: hsva.a }))} />
            <NumberField label={t.greenLabel} value={rgba.g} min={0} max={255} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted} fullWidth
              onCommit={(g) => updateHsva(rgbaToHsva({ r: rgba.r, g, b: rgba.b, a: hsva.a }))} />
            <NumberField label={t.blueLabel} value={rgba.b} min={0} max={255} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted} fullWidth
              onCommit={(b) => updateHsva(rgbaToHsva({ r: rgba.r, g: rgba.g, b, a: hsva.a }))} />
          </Box>
        )}

        {activeFormat === "hsl" && (
          <Box sx={{ display: "flex", gap: 0.75 }}>
            <NumberField label={t.hueFieldLabel} value={hsla.h} min={0} max={360} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted} fullWidth
              onCommit={(h) => updateHsva({ ...hsva, h })} />
            <NumberField label={t.saturationFieldLabel} value={hsla.s} min={0} max={100} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted} fullWidth
              onCommit={(s) => updateHsva(hslaToHsva({ h: hsla.h, s, l: hsla.l, a: hsla.a }))} />
            <NumberField label={t.lightnessFieldLabel} value={hsla.l} min={0} max={100} disabled={disabled} size={inputSize} onBlurExtra={fireCommitted} fullWidth
              onCommit={(l) => updateHsva(hslaToHsva({ h: hsla.h, s: hsla.s, l, a: hsla.a }))} />
          </Box>
        )}
      </Box>
      )}

      {savedColors && savedColors.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
            {t.savedColorsLabel}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
            {savedColors.map((color, i) => (
              <Box
                key={`${color}-${i}`}
                component="button"
                type="button"
                disabled={disabled}
                aria-label={color}
                onClick={() => {
                  const parsed = parseColorString(color);
                  if (parsed) commitHsva(rgbaToHsva(parsed));
                }}
                sx={{
                  width: swatchSize,
                  height: swatchSize,
                  p: 0,
                  borderRadius: 0.5,
                  border: `1px solid ${theme.palette.divider}`,
                  cursor: disabled ? "default" : "pointer",
                  flexShrink: 0,
                  ...checkeredBackground,
                  backgroundSize: "6px 6px",
                  "&:hover": disabled ? undefined : { borderColor: theme.palette.primary.main },
                }}
              >
                <Box sx={{ width: "100%", height: "100%", borderRadius: 0.5, backgroundColor: color }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {name && <input type="hidden" name={name} value={info.hex} />}
    </Box>
  );
}
