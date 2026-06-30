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
  value, onCommit, min, max, label, disabled,
}: {
  value: number; onCommit: (n: number) => void; min: number; max: number;
  label: string; disabled?: boolean;
}) {
  const [draft, setDraft] = useState(String(Math.round(value)));
  useEffect(() => { setDraft(String(Math.round(value))); }, [value]);

  return (
    <TextField
      size="small"
      value={draft}
      disabled={disabled}
      onChange={(e) => {
        const next = e.target.value;
        setDraft(next);
        const n = Number(next);
        if (next.trim() !== "" && !Number.isNaN(n)) onCommit(clamp(n, min, max));
      }}
      onBlur={() => setDraft(String(Math.round(value)))}
      slotProps={{ htmlInput: { "aria-label": label, style: { textAlign: "center", padding: "6px 4px" } } }}
      sx={{ width: 48 }}
    />
  );
}

export function ColorPicker({
  value,
  onChange,
  defaultFormat = "hex",
  onFormatChange,
  showAlpha = true,
  showEyeDropper = true,
  savedColors,
  disabled = false,
  size = "medium",
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
  const [format, setFormat] = useState<ColorPickerFormat>(defaultFormat);

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

  const gradientHeight = size === "small" ? 130 : 160;
  const swatchSize = size === "small" ? 20 : 24;
  const trackThickness = size === "small" ? 10 : 12;
  const thumbSize = size === "small" ? 13 : 16;

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
      if (parsed) updateHsva(rgbaToHsva({ ...parsed, a: hsva.a }));
    } catch {
      // User cancelled (Escape) — nothing to do.
    }
  };

  const handleFormatChange = (next: ColorPickerFormat) => {
    setFormat(next);
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
            left: `${hsva.s}%`,
            top: `${100 - hsva.v}%`,
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
                left: `${(hsva.h / 360) * 100}%`,
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
                  left: `${hsva.a * 100}%`,
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

      <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
        <Select
          size="small"
          value={format}
          aria-label={t.formatLabel}
          disabled={disabled}
          onChange={(e) => handleFormatChange(e.target.value as ColorPickerFormat)}
          sx={{ minWidth: 78, fontSize: "0.75rem" }}
        >
          <MenuItem value="hex">HEX</MenuItem>
          <MenuItem value="rgb">RGB</MenuItem>
          <MenuItem value="hsl">HSL</MenuItem>
        </Select>

        {format === "hex" && (
          <TextField
            size="small"
            value={hexDraft}
            disabled={disabled}
            onChange={(e) => {
              const next = e.target.value;
              setHexDraft(next);
              const parsed = hexToRgba(next);
              if (parsed) updateHsva(rgbaToHsva({ ...parsed, a: hsva.a }));
            }}
            onBlur={() => setHexDraft(hexNoAlpha)}
            slotProps={{ htmlInput: { "aria-label": t.hexFieldLabel } }}
            sx={{ flex: 1 }}
          />
        )}

        {format === "rgb" && (
          <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
            <NumberField label={t.redLabel} value={rgba.r} min={0} max={255} disabled={disabled}
              onCommit={(r) => updateHsva(rgbaToHsva({ r, g: rgba.g, b: rgba.b, a: hsva.a }))} />
            <NumberField label={t.greenLabel} value={rgba.g} min={0} max={255} disabled={disabled}
              onCommit={(g) => updateHsva(rgbaToHsva({ r: rgba.r, g, b: rgba.b, a: hsva.a }))} />
            <NumberField label={t.blueLabel} value={rgba.b} min={0} max={255} disabled={disabled}
              onCommit={(b) => updateHsva(rgbaToHsva({ r: rgba.r, g: rgba.g, b, a: hsva.a }))} />
          </Box>
        )}

        {format === "hsl" && (
          <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
            <NumberField label={t.hueFieldLabel} value={hsla.h} min={0} max={360} disabled={disabled}
              onCommit={(h) => updateHsva({ ...hsva, h })} />
            <NumberField label={t.saturationFieldLabel} value={hsla.s} min={0} max={100} disabled={disabled}
              onCommit={(s) => updateHsva(hslaToHsva({ h: hsla.h, s, l: hsla.l, a: hsla.a }))} />
            <NumberField label={t.lightnessFieldLabel} value={hsla.l} min={0} max={100} disabled={disabled}
              onCommit={(l) => updateHsva(hslaToHsva({ h: hsla.h, s: hsla.s, l, a: hsla.a }))} />
          </Box>
        )}

        {showAlpha && (
          <NumberField label={t.alphaFieldLabel} value={Math.round(hsva.a * 100)} min={0} max={100} disabled={disabled}
            onCommit={(a) => updateHsva({ ...hsva, a: a / 100 })} />
        )}
      </Box>

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
                  if (parsed) updateHsva(rgbaToHsva(parsed));
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
