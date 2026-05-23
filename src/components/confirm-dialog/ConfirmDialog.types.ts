import type React from "react";

export type ConfirmDialogSeverity = "info" | "warning" | "error" | "success";

export type ConfirmDialogTranslation = {
  confirmLabel: string;
  cancelLabel:  string;
};

export const DEFAULT_CONFIRM_DIALOG_TRANSLATION: ConfirmDialogTranslation = {
  confirmLabel: "Confirm",
  cancelLabel:  "Cancel",
};

export type ConfirmDialogOptions = {
  title?:            string;
  description?:      string | React.ReactNode;
  confirmLabel?:     string;
  cancelLabel?:      string;
  severity?:         ConfirmDialogSeverity;
  hideCancelButton?: boolean;
  maxWidth?:         "xs" | "sm" | "md" | "lg" | "xl";
  showIcon?:         boolean;
};

export type ConfirmDialogProviderProps = {
  children:     React.ReactNode;
  translation?: Partial<ConfirmDialogTranslation>;
};
