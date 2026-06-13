export type ControlDef =
  | { key: string; label: string; type: "boolean" }
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "number"; min?: number; max?: number; step?: number }
  | { key: string; label: string; type: "slider"; min: number; max: number; step: number }
  | { key: string; label: string; type: "select"; options: string[] }
  | { key: string; label: string; type: "color" };

export type ControlValue = string | number | boolean;

export type ControlValues = Record<string, ControlValue>;

/**
 * Converts a "color" control's empty-string value ("" = theme default) to
 * `undefined`, so optional color props fall back to their component default
 * instead of receiving an invalid empty string (which renders as `fill=""` /
 * `stroke=""` and is dropped by the browser, e.g. links becoming invisible).
 */
export function colorProp(value: ControlValue): string | undefined {
  return value === "" ? undefined : (value as string);
}
