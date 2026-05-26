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
  cancelLabel?:      string;
  confirmLabel?:     string;
  description?:      string | React.ReactNode;
  hideCancelButton?: boolean;
  maxWidth?:         "xs" | "sm" | "md" | "lg" | "xl";
  severity?:         ConfirmDialogSeverity;
  showIcon?:         boolean;
  title?:            string;
};

export type ConfirmDialogProviderProps = {
  children:     React.ReactNode;
  translation?: Partial<ConfirmDialogTranslation>;
};
