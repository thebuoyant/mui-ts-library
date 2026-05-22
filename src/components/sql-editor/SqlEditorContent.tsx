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
import { tags } from "@lezer/highlight";
import { Box, useTheme } from "@mui/material";
import type { SqlEditorDialect } from "./SqlEditor.types";

const DIALECT_MAP = {
  standard:   StandardSQL,
  mysql:      MySQL,
  postgresql: PostgreSQL,
  sqlite:     SQLite,
  mssql:      MSSQL,
};

type SqlEditorContentProps = {
  value?:           string;
  onChange?:        (sql: string) => void;
  placeholder?:     string;
  disabled?:        boolean;
  readonly?:        boolean;
  showLineNumbers?: boolean;
  dialect?:         SqlEditorDialect;
  onViewReady:      (view: EditorView | null) => void;
  onCursorChange:   (line: number, col: number) => void;
  onBlur?:          () => void;
  onFocus?:         () => void;
};

export function SqlEditorContent({
  value,
  onChange,
  placeholder,
  disabled = false,
  readonly = false,
  showLineNumbers = true,
  dialect = "standard",
  onViewReady,
  onCursorChange,
  onBlur,
  onFocus,
}: SqlEditorContentProps) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const viewRef        = useRef<EditorView | null>(null);
  const onChangeRef    = useRef(onChange);
  const onCursorRef    = useRef(onCursorChange);
  const onBlurRef      = useRef(onBlur);
  const onFocusRef     = useRef(onFocus);
  const onViewReadyRef = useRef(onViewReady);

  const editableCompartment = useRef(new Compartment());
  const readOnlyCompartment = useRef(new Compartment());

  const muiTheme = useTheme();
  const isDark   = muiTheme.palette.mode === "dark";

  useEffect(() => { onChangeRef.current    = onChange;       }, [onChange]);
  useEffect(() => { onCursorRef.current    = onCursorChange; }, [onCursorChange]);
  useEffect(() => { onBlurRef.current      = onBlur;         }, [onBlur]);
  useEffect(() => { onFocusRef.current     = onFocus;        }, [onFocus]);
  useEffect(() => { onViewReadyRef.current = onViewReady;    }, [onViewReady]);

  // Recreate editor on theme-mode or dialect change
  useEffect(() => {
    if (!containerRef.current) return;

    // Preserve current content when recreating (e.g. on dark-mode toggle)
    const currentDoc = viewRef.current?.state.doc.toString() ?? value ?? "";

    const highlightStyle = HighlightStyle.define([
      { tag: tags.keyword,                              color: muiTheme.palette.primary.main,    fontWeight: "bold" },
      { tag: [tags.string, tags.special(tags.string)], color: muiTheme.palette.success.dark },
      { tag: tags.number,                              color: muiTheme.palette.warning.dark },
      { tag: [tags.lineComment, tags.blockComment],    color: muiTheme.palette.text.disabled,   fontStyle: "italic" },
      { tag: tags.operator,                            color: muiTheme.palette.text.secondary },
      { tag: [tags.function(tags.variableName), tags.function(tags.name)],
                                                       color: muiTheme.palette.secondary.main },
      { tag: tags.typeName,                            color: muiTheme.palette.info.main },
      { tag: tags.invalid,                             color: muiTheme.palette.error.main,      textDecoration: "underline wavy" },
    ]);

    const editorTheme = EditorView.theme(
      {
        "&": {
          height:     "100%",
          fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
          fontSize:   "0.875rem",
        },
        ".cm-scroller": { overflow: "auto" },
        ".cm-content": {
          padding:    "8px 4px",
          caretColor: muiTheme.palette.text.primary,
        },
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
      },
      { dark: isDark },
    );

    const extensions = [
      editorTheme,
      syntaxHighlighting(highlightStyle),
      sql({ dialect: DIALECT_MAP[dialect] }),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      editableCompartment.current.of(EditorView.editable.of(!disabled && !readonly)),
      readOnlyCompartment.current.of(EditorState.readOnly.of(readonly)),
      highlightActiveLine(),
      ...(showLineNumbers ? [lineNumbers(), highlightActiveLineGutter()] : []),
      ...(placeholder ? [cmPlaceholder(placeholder)] : []),
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
  }, [isDark, dialect]);

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
