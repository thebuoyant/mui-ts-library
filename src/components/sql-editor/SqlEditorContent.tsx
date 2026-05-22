import { useEffect, useRef } from "react";
import {
  EditorView,
  lineNumbers,
  keymap,
  highlightActiveLine,
  highlightActiveLineGutter,
  placeholder as cmPlaceholder,
} from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { sql, MySQL, PostgreSQL, SQLite, MSSQL, StandardSQL } from "@codemirror/lang-sql";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { autocompletion, completionKeymap, type Completion } from "@codemirror/autocomplete";
import { linter, lintGutter, type Diagnostic } from "@codemirror/lint";
import { tags } from "@lezer/highlight";
import { Box, useTheme } from "@mui/material";
import type { SqlEditorDialect, SqlLintError, SqlSchema } from "./SqlEditor.types";

const DIALECT_MAP = {
  standard:   StandardSQL,
  mysql:      MySQL,
  postgresql: PostgreSQL,
  sqlite:     SQLite,
  mssql:      MSSQL,
};

type SqlEditorContentProps = {
  value?:                string;
  onChange?:             (sql: string) => void;
  placeholder?:          string;
  disabled?:             boolean;
  readonly?:             boolean;
  showLineNumbers?:      boolean;
  dialect?:              SqlEditorDialect;
  keywordColor?:         string;
  stringColor?:          string;
  identifierColor?:      string;
  schema?:               SqlSchema;
  onLint?:               (sql: string) => Promise<SqlLintError[]> | SqlLintError[];
  onDiagnosticsChange?:  (count: number) => void;
  onViewReady:           (view: EditorView | null) => void;
  onCursorChange:        (line: number, col: number) => void;
  onBlur?:               () => void;
  onFocus?:              () => void;
};

export function SqlEditorContent({
  value,
  onChange,
  placeholder,
  disabled = false,
  readonly = false,
  showLineNumbers = true,
  dialect = "standard",
  keywordColor,
  stringColor,
  identifierColor,
  schema,
  onLint,
  onDiagnosticsChange,
  onViewReady,
  onCursorChange,
  onBlur,
  onFocus,
}: SqlEditorContentProps) {
  const containerRef          = useRef<HTMLDivElement>(null);
  const viewRef               = useRef<EditorView | null>(null);
  const onChangeRef           = useRef(onChange);
  const onCursorRef           = useRef(onCursorChange);
  const onBlurRef             = useRef(onBlur);
  const onFocusRef            = useRef(onFocus);
  const onViewReadyRef        = useRef(onViewReady);
  const onLintRef             = useRef(onLint);
  const onDiagnosticsRef      = useRef(onDiagnosticsChange);

  const editableCompartment = useRef(new Compartment());
  const readOnlyCompartment = useRef(new Compartment());

  const muiTheme  = useTheme();
  const isDark    = muiTheme.palette.mode === "dark";
  const hasLint   = !!onLint;
  const schemaKey = JSON.stringify(schema);

  useEffect(() => { onChangeRef.current      = onChange;            }, [onChange]);
  useEffect(() => { onCursorRef.current      = onCursorChange;      }, [onCursorChange]);
  useEffect(() => { onBlurRef.current        = onBlur;              }, [onBlur]);
  useEffect(() => { onFocusRef.current       = onFocus;             }, [onFocus]);
  useEffect(() => { onViewReadyRef.current   = onViewReady;         }, [onViewReady]);
  useEffect(() => { onLintRef.current        = onLint;              }, [onLint]);
  useEffect(() => { onDiagnosticsRef.current = onDiagnosticsChange; }, [onDiagnosticsChange]);

  // Recreate editor on theme-mode, dialect, or lint toggle change
  useEffect(() => {
    if (!containerRef.current) return;

    const currentDoc = viewRef.current?.state.doc.toString() ?? value ?? "";

    const kwColor  = keywordColor    ?? muiTheme.palette.primary.main;
    const strColor = stringColor     ?? muiTheme.palette.success.main;
    const idColor  = identifierColor ?? muiTheme.palette.info.main;

    const highlightStyle = HighlightStyle.define([
      { tag: tags.keyword,                              color: kwColor,  fontWeight: "bold" },
      { tag: tags.name,                                 color: idColor },
      { tag: [tags.string, tags.special(tags.string)], color: strColor, fontWeight: "bold" },
      { tag: tags.number,                              color: muiTheme.palette.warning.main },
      { tag: [tags.lineComment, tags.blockComment],    color: muiTheme.palette.text.disabled, fontStyle: "italic" },
      { tag: tags.operator,                            color: muiTheme.palette.text.secondary },
      { tag: [tags.function(tags.variableName), tags.function(tags.name)],
                                                       color: muiTheme.palette.secondary.main },
      { tag: tags.typeName,                            color: muiTheme.palette.info.main },
      { tag: tags.invalid,                             color: muiTheme.palette.error.main,    textDecoration: "underline wavy" },
    ]);

    const editorTheme = EditorView.theme(
      {
        "&": {
          height:     "100%",
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          fontSize:   "0.875rem",
        },
        ".cm-scroller": { overflow: "auto" },
        ".cm-content": { padding: "8px 4px", caretColor: muiTheme.palette.text.primary },
        ".cm-gutters": {
          backgroundColor: isDark ? muiTheme.palette.grey[900] : muiTheme.palette.grey[50],
          color:           muiTheme.palette.text.disabled,
          border:          "none",
          borderRight:     `1px solid ${muiTheme.palette.divider}`,
        },
        ".cm-lineNumbers .cm-gutterElement": { minWidth: "36px", paddingLeft: "4px" },
        ".cm-activeLineGutter": { backgroundColor: muiTheme.palette.action.selected },
        ".cm-activeLine":       { backgroundColor: muiTheme.palette.action.hover },
        "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
          backgroundColor: muiTheme.palette.primary.main + "40",
        },
        ".cm-cursor, .cm-dropCursor": { borderLeftColor: muiTheme.palette.text.primary },
        "&.cm-focused": { outline: "none" },
        ".cm-placeholder": { color: muiTheme.palette.text.disabled, fontStyle: "italic" },
        // Autocomplete tooltip
        ".cm-tooltip": {
          backgroundColor: muiTheme.palette.background.paper,
          border:          `1px solid ${muiTheme.palette.divider}`,
          borderRadius:    "4px",
          boxShadow:       muiTheme.shadows[4],
        },
        ".cm-tooltip-autocomplete > ul > li": {
          color: muiTheme.palette.text.primary,
        },
        ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
          backgroundColor: muiTheme.palette.primary.main + "20",
          color:           muiTheme.palette.primary.main,
        },
        ".cm-completionMatchedText": {
          color:          muiTheme.palette.primary.main,
          textDecoration: "none",
          fontWeight:     "bold",
        },
        ".cm-completionDetail": {
          color:      muiTheme.palette.text.secondary,
          fontStyle:  "italic",
        },
        // Lint gutter
        ".cm-gutter-lint": { width: "16px" },
        ".cm-lint-marker-error":   { color: muiTheme.palette.error.main },
        ".cm-lint-marker-warning": { color: muiTheme.palette.warning.main },
        // Diagnostic tooltip
        ".cm-tooltip.cm-tooltip-lint": {
          backgroundColor: muiTheme.palette.background.paper,
          border:          `1px solid ${muiTheme.palette.divider}`,
          borderRadius:    "4px",
        },
        ".cm-diagnostic-error":   { borderLeft: `3px solid ${muiTheme.palette.error.main}` },
        ".cm-diagnostic-warning": { borderLeft: `3px solid ${muiTheme.palette.warning.main}` },
        ".cm-diagnostic-info":    { borderLeft: `3px solid ${muiTheme.palette.info.main}` },
      },
      { dark: isDark },
    );

    const cmSchema: Record<string, Completion[]> | undefined = schema
      ? Object.fromEntries(
          schema.tables.map((t) => [
            t.name,
            (t.columns ?? []).map((c) => ({
              label:  c.name,
              detail: c.type,
              type:   "property",
            } satisfies Completion)),
          ]),
        )
      : undefined;

    const linterSource = async (view: EditorView): Promise<Diagnostic[]> => {
      const onLintFn = onLintRef.current;
      if (!onLintFn) return [];
      const docStr = view.state.doc.toString();
      try {
        const errors = await onLintFn(docStr);
        const diagnostics: Diagnostic[] = errors.map((e) => {
          const safeLineNo = Math.max(1, Math.min(e.line, view.state.doc.lines));
          const lineInfo   = view.state.doc.line(safeLineNo);
          const from       = lineInfo.from + Math.max(0, (e.col ?? 1) - 1);
          return { from, to: lineInfo.to, severity: e.severity ?? "error", message: e.message };
        });
        onDiagnosticsRef.current?.(diagnostics.length);
        return diagnostics;
      } catch {
        return [];
      }
    };

    const extensions = [
      editorTheme,
      syntaxHighlighting(highlightStyle),
      sql({ dialect: DIALECT_MAP[dialect], schema: cmSchema }),
      history(),
      autocompletion(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...completionKeymap]),
      editableCompartment.current.of(EditorView.editable.of(!disabled && !readonly)),
      readOnlyCompartment.current.of(EditorState.readOnly.of(readonly)),
      highlightActiveLine(),
      ...(showLineNumbers ? [lineNumbers(), highlightActiveLineGutter()] : []),
      ...(placeholder ? [cmPlaceholder(placeholder)] : []),
      ...(hasLint ? [lintGutter(), linter(linterSource, { delay: 600 })] : []),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChangeRef.current?.(update.state.doc.toString());
        }
        const cursor = update.state.selection.main.head;
        const line   = update.state.doc.lineAt(cursor);
        onCursorRef.current(line.number, cursor - line.from + 1);
      }),
      EditorView.domEventHandlers({
        blur:  () => { onBlurRef.current?.();  },
        focus: () => { onFocusRef.current?.(); },
      }),
    ];

    const view = new EditorView({
      state: EditorState.create({ doc: currentDoc, extensions }),
      parent: containerRef.current,
    });

    viewRef.current = view;
    onViewReadyRef.current(view);

    return () => {
      onViewReadyRef.current(null);
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark, dialect, hasLint, keywordColor, stringColor, identifierColor, schemaKey]);

  // Sync external value without resetting cursor
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== (value ?? "")) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: value ?? "" } });
    }
  }, [value]);

  // Sync editable / readOnly dynamically
  useEffect(() => {
    viewRef.current?.dispatch({
      effects: [
        editableCompartment.current.reconfigure(EditorView.editable.of(!disabled && !readonly)),
        readOnlyCompartment.current.reconfigure(EditorState.readOnly.of(readonly)),
      ],
    });
  }, [disabled, readonly]);

  return (
    <Box
      ref={containerRef}
      sx={{
        flex:            1,
        overflow:        "hidden",
        display:         "flex",
        flexDirection:   "column",
        opacity:         disabled ? 0.5 : 1,
        backgroundColor: muiTheme.palette.background.paper,
        "& .cm-editor": { flex: 1, display: "flex", flexDirection: "column" },
      }}
    />
  );
}
