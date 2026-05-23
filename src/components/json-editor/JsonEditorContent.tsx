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
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language";
import { linter, lintGutter } from "@codemirror/lint";
import { tags } from "@lezer/highlight";
import { Box, useTheme } from "@mui/material";
import type { JsonEditorHighlightColors } from "./JsonEditor.types";

type JsonEditorContentProps = {
  value?:           string;
  onChange?:        (json: string) => void;
  placeholder?:     string;
  disabled?:        boolean;
  readonly?:        boolean;
  showLineNumbers?: boolean;
  highlightColors?: JsonEditorHighlightColors;
  onViewReady:      (view: EditorView | null) => void;
  onCursorChange:   (line: number, col: number) => void;
  onBlur?:          () => void;
  onFocus?:         () => void;
};

export function JsonEditorContent({
  value,
  onChange,
  placeholder,
  disabled = false,
  readonly = false,
  showLineNumbers = true,
  highlightColors,
  onViewReady,
  onCursorChange,
  onBlur,
  onFocus,
}: JsonEditorContentProps) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const viewRef         = useRef<EditorView | null>(null);
  const onChangeRef     = useRef(onChange);
  const onCursorRef     = useRef(onCursorChange);
  const onBlurRef       = useRef(onBlur);
  const onFocusRef      = useRef(onFocus);
  const onViewReadyRef  = useRef(onViewReady);

  const editableCompartment = useRef(new Compartment());
  const readOnlyCompartment = useRef(new Compartment());

  const muiTheme = useTheme();
  const isDark   = muiTheme.palette.mode === "dark";

  const propColor = highlightColors?.propertyName ?? muiTheme.palette.primary.main;
  const strColor  = highlightColors?.string       ?? muiTheme.palette.success.main;
  const numColor  = highlightColors?.number       ?? muiTheme.palette.warning.main;
  const boolColor = highlightColors?.boolean      ?? muiTheme.palette.info.main;
  const nullColor = highlightColors?.null         ?? muiTheme.palette.text.secondary;

  useEffect(() => { onChangeRef.current    = onChange;      }, [onChange]);
  useEffect(() => { onCursorRef.current    = onCursorChange; }, [onCursorChange]);
  useEffect(() => { onBlurRef.current      = onBlur;        }, [onBlur]);
  useEffect(() => { onFocusRef.current     = onFocus;       }, [onFocus]);
  useEffect(() => { onViewReadyRef.current = onViewReady;   }, [onViewReady]);

  useEffect(() => {
    if (!containerRef.current) return;

    const currentDoc = viewRef.current?.state.doc.toString() ?? value ?? "";

    const highlightStyle = HighlightStyle.define([
      { tag: tags.propertyName,                              color: propColor, fontWeight: "bold" },
      { tag: tags.string,                                    color: strColor },
      { tag: tags.number,                                    color: numColor },
      { tag: tags.bool,                                      color: boolColor, fontWeight: "bold" },
      { tag: tags.null,                                      color: nullColor, fontStyle: "italic" },
      { tag: tags.bracket,                                   color: muiTheme.palette.text.secondary },
      { tag: tags.punctuation,                               color: muiTheme.palette.text.disabled },
      { tag: tags.invalid,                                   color: muiTheme.palette.error.main, textDecoration: "underline wavy" },
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
        ".cm-gutter-lint": { width: "16px" },
        ".cm-lint-marker-error":   { color: muiTheme.palette.error.main },
        ".cm-lint-marker-warning": { color: muiTheme.palette.warning.main },
        ".cm-tooltip.cm-tooltip-lint": {
          backgroundColor: muiTheme.palette.background.paper,
          border:          `1px solid ${muiTheme.palette.divider}`,
          borderRadius:    "4px",
        },
        ".cm-diagnostic-error":   { borderLeft: `3px solid ${muiTheme.palette.error.main}` },
        ".cm-diagnostic-warning": { borderLeft: `3px solid ${muiTheme.palette.warning.main}` },
      },
      { dark: isDark },
    );

    const extensions = [
      editorTheme,
      syntaxHighlighting(highlightStyle),
      json(),
      lintGutter(),
      linter(jsonParseLinter()),
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
  }, [isDark, propColor, strColor, numColor, boolColor, nullColor]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== (value ?? "")) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: value ?? "" } });
    }
  }, [value]);

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
