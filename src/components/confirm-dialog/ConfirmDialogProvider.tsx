import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon      from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorOutlineIcon      from "@mui/icons-material/ErrorOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import type {
  ConfirmDialogOptions,
  ConfirmDialogProviderProps,
  ConfirmDialogSeverity,
  ConfirmDialogTranslation,
} from "./ConfirmDialog.types";
import { DEFAULT_CONFIRM_DIALOG_TRANSLATION } from "./ConfirmDialog.types";

// ─── internal ────────────────────────────────────────────────────────────────

const SEVERITY_ICON: Record<ConfirmDialogSeverity, React.ElementType> = {
  info:    InfoOutlinedIcon,
  warning: WarningAmberOutlinedIcon,
  error:   ErrorOutlineIcon,
  success: CheckCircleOutlineIcon,
};

const SEVERITY_COLOR: Record<ConfirmDialogSeverity, "primary" | "warning" | "error" | "success"> = {
  info:    "primary",
  warning: "warning",
  error:   "error",
  success: "success",
};

type ConfirmDialogUIProps = {
  open:        boolean;
  options:     ConfirmDialogOptions;
  translation: ConfirmDialogTranslation;
  onConfirm:   () => void;
  onCancel:    () => void;
};

function ConfirmDialogUI({
  open,
  options,
  translation,
  onConfirm,
  onCancel,
}: ConfirmDialogUIProps) {
  const {
    title,
    description,
    confirmLabel,
    cancelLabel,
    countdown,
    severity         = "info",
    hideCancelButton = false,
    maxWidth         = "xs",
    showIcon         = true,
  } = options;

  const SeverityIcon    = showIcon ? SEVERITY_ICON[severity] : null;
  const confirmColor    = SEVERITY_COLOR[severity];
  const resolvedConfirm = confirmLabel ?? translation.confirmLabel;
  const resolvedCancel  = cancelLabel  ?? translation.cancelLabel;

  // Countdown timer — auto-confirms when it reaches 0
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!open || !countdown || countdown <= 0) {
      setRemaining(null);
      return;
    }
    setRemaining(countdown);
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [open, countdown]);

  // When remaining hits 0 trigger confirm
  useEffect(() => {
    if (remaining === 0) onConfirm();
  // onConfirm is stable (wrapped in handleConfirm below)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  // Keyboard: Enter = Confirm, Escape handled by Dialog onClose
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      onConfirm();
    }
  }

  const confirmButtonLabel = remaining !== null && remaining > 0
    ? `${resolvedConfirm} (${remaining})`
    : resolvedConfirm;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      onKeyDown={handleKeyDown}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby={title ? "confirm-dialog-title" : undefined}
      aria-describedby={description ? "confirm-dialog-description" : undefined}
    >
      {title && (
        <DialogTitle
          id="confirm-dialog-title"
          data-testid="confirm-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {SeverityIcon && (
            <SeverityIcon
              color={severity}
              data-testid="confirm-dialog-icon"
              fontSize="small"
            />
          )}
          {title}
        </DialogTitle>
      )}

      {description && (
        <>
          <Divider />
          <DialogContent>
            {typeof description === "string" ? (
              <Typography
                id="confirm-dialog-description"
                data-testid="confirm-dialog-description"
                variant="body2"
                color="text.secondary"
              >
                {description}
              </Typography>
            ) : (
              <div
                id="confirm-dialog-description"
                data-testid="confirm-dialog-description"
              >
                {description}
              </div>
            )}
          </DialogContent>
        </>
      )}

      <Divider />

      <DialogActions sx={{ px: 2, py: 1.5 }}>
        {!hideCancelButton && (
          <Button
            data-testid="confirm-dialog-cancel-btn"
            onClick={onCancel}
            color="inherit"
          >
            {resolvedCancel}
          </Button>
        )}
        <Button
          data-testid="confirm-dialog-confirm-btn"
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          autoFocus
        >
          {confirmButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── context ─────────────────────────────────────────────────────────────────

type ConfirmFn = (options: ConfirmDialogOptions) => Promise<boolean>;

const ConfirmDialogContext = createContext<ConfirmFn>(() => Promise.resolve(false));

// ─── provider ────────────────────────────────────────────────────────────────

type DialogState = {
  open:    boolean;
  options: ConfirmDialogOptions;
};

export function ConfirmDialogProvider({ children, translation }: ConfirmDialogProviderProps) {
  const t = { ...DEFAULT_CONFIRM_DIALOG_TRANSLATION, ...translation };

  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);

  const [state, setState] = useState<DialogState>({ open: false, options: {} });

  const confirm = useCallback<ConfirmFn>((options) => {
    // If a dialog is already open, auto-cancel the previous promise.
    resolveRef.current?.(false);

    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({ open: true, options });
    });
  }, []);

  const handleConfirm = () => {
    resolveRef.current?.(true);
    resolveRef.current = null;
    setState((s) => ({ ...s, open: false }));
  };

  const handleCancel = () => {
    resolveRef.current?.(false);
    resolveRef.current = null;
    setState((s) => ({ ...s, open: false }));
  };

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {children}
      <ConfirmDialogUI
        open={state.open}
        options={state.options}
        translation={t}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmDialogContext.Provider>
  );
}

// ─── hook ────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirm(): ConfirmFn {
  return useContext(ConfirmDialogContext);
}
