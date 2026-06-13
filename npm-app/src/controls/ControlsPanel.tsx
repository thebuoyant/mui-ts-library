import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { ControlDef, ControlValues } from "./types";

type ControlsPanelProps = {
  title?: string;
  controls: ControlDef[];
  values: ControlValues;
  onChange: (key: string, value: ControlValues[string]) => void;
};

export function ControlsPanel({ title = "Props", controls, values, onChange }: ControlsPanelProps) {
  return (
    <Stack spacing={1.75} sx={{ width: 300, flexShrink: 0 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {controls.map((control) => {
        const value = values[control.key];

        switch (control.type) {
          case "boolean":
            return (
              <FormControlLabel
                key={control.key}
                control={
                  <Switch
                    size="small"
                    checked={Boolean(value)}
                    onChange={(e) => onChange(control.key, e.target.checked)}
                  />
                }
                label={control.label}
              />
            );

          case "text":
            return (
              <TextField
                key={control.key}
                label={control.label}
                size="small"
                fullWidth
                value={value ?? ""}
                onChange={(e) => onChange(control.key, e.target.value)}
              />
            );

          case "number":
            return (
              <TextField
                key={control.key}
                label={control.label}
                size="small"
                type="number"
                fullWidth
                value={value ?? 0}
                onChange={(e) => onChange(control.key, Number(e.target.value))}
                slotProps={{
                  htmlInput: { min: control.min, max: control.max, step: control.step },
                }}
              />
            );

          case "slider":
            return (
              <Box key={control.key}>
                <Typography variant="caption" color="text.secondary">
                  {control.label}: {value}
                </Typography>
                <Slider
                  size="small"
                  value={Number(value)}
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  onChange={(_, v) => onChange(control.key, v as number)}
                />
              </Box>
            );

          case "select":
            return (
              <FormControl key={control.key} size="small" fullWidth>
                <InputLabel>{control.label}</InputLabel>
                <Select
                  label={control.label}
                  value={String(value ?? "")}
                  onChange={(e) => onChange(control.key, e.target.value)}
                >
                  {control.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );

          case "color":
            return (
              <Box key={control.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {control.label}
                </Typography>
                <input
                  type="color"
                  value={(value as string) || "#000000"}
                  onChange={(e) => onChange(control.key, e.target.value)}
                  style={{ width: 32, height: 32, padding: 0, border: "none", background: "none" }}
                />
                <Button size="small" onClick={() => onChange(control.key, "")}>
                  Reset
                </Button>
              </Box>
            );

          default:
            return null;
        }
      })}
    </Stack>
  );
}
