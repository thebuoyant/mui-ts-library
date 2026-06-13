export type ControlDef =
  | { key: string; label: string; type: "boolean" }
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "number"; min?: number; max?: number; step?: number }
  | { key: string; label: string; type: "slider"; min: number; max: number; step: number }
  | { key: string; label: string; type: "select"; options: string[] }
  | { key: string; label: string; type: "color" };

export type ControlValue = string | number | boolean;

export type ControlValues = Record<string, ControlValue>;
