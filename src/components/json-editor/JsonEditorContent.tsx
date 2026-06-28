import { useEffect, useRef, useState } from "react";
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
import { syntaxHighlighting, HighlightStyle, foldGutter, foldKeymap } from "@codemirror/language";
import { linter, lintGutter, forceLinting, type Diagnostic } from "@codemirror/lint";
import { tags } from "@lezer/highlight";
import { showMinimap as cmShowMinimap } from "@replit/codemirror-minimap";
import { Box, Fade, Paper, Typography, useTheme } from "@mui/material";
import type { JsonEditorHighlightColors, JsonEditorSchema } from "./JsonEditor.types";
import { computeJsonPath } from "./util/jsonPathFinder";
import { validateAgainstSchema, findRangeForPath } from "./util/jsonSchemaValidator";

type JsonEditorContentProps = {
  value?:             string;
  onChange?:          (json: string) => void;
  placeholder?:       string;
  disabled?:          boolean;
  readonly?:          boolean;
  schema?:            JsonEditorSchema;
  showLineNumbers?:   boolean;
  showMinimap?:       boolean;
  showFolding?:       boolean;
  enablePathFinder?:  boolean;
  highlightColors?:   JsonEditorHighlightColors;
  onViewReady:        (view: EditorView | null) => void;
  onCursorChange:     (line: number, col: number) => void;
  onBlur?:            () => void;
  onFocus?:           () => void;
  onPathCopy?:        (path: string) => void;
};

type PathFeedback = { x: number; y: number; path: string };

// Extracted so the same logic drives both the initial extensions array and the
// live-reconfigure effect below — showFolding/showLineNumbers/placeholder used
// to be baked in at editor-creation time only, silently ignoring later changes.
function lineNumbersExtensions(show: boolean) {
  return show ? [lineNumbers(), highlightActiveLineGutter()] : [];
}
function foldingExtensions(show: boolean) {
  return show ? [foldGutter()] : [];
}
function placeholderExtensions(text: string | undefined) {
  return text ? [cmPlaceholder(text)] : [];
}

export function JsonEditorContent({
  value,
  onChange,
  placeholder,
  disabled = false,
  readonly = false,
  schema,
  showLineNumbers = true,
  showMinimap = false,
  showFolding = true,
  enablePathFinder = true,
  highlightColors,
  onViewReady,
  onCursorChange,
  onBlur,
  onFocus,
  onPathCopy,
}: JsonEditorContentProps) {
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const containerRef    = useRef<HTMLDivElement>(null);
  const viewRef         = useRef<EditorView | null>(null);
  const onChangeRef     = useRef(onChange);
  const onCursorRef     = useRef(onCursorChange);
  const onBlurRef       = useRef(onBlur);
  const onFocusRef      = useRef(onFocus);
  const onViewReadyRef  = useRef(onViewReady);
  const onPathCopyRef   = useRef(onPathCopy);
  const enablePathFinderRef = useRef(enablePathFinder);
  const schemaRef        = useRef(schema);

  const [pathFeedback, setPathFeedback] = useState<PathFeedback | null>(null);

  const editableCompartment     = useRef(new Compartment());
  const readOnlyCompartment     = useRef(new Compartment());
  const foldingCompartment      = useRef(new Compartment());
  const lineNumbersCompartment  = useRef(new Compartment());
  const placeholderCompartment  = useRef(new Compartment());

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
  useEffect(() => { onPathCopyRef.current  = onPathCopy;    }, [onPathCopy]);
  useEffect(() => { enablePathFinderRef.current = enablePathFinder; }, [enablePathFinder]);
  useEffect(() => {
    schemaRef.current = schema;
    if (viewRef.current) forceLinting(viewRef.current);
  }, [schema]);

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
        ".cm-lineNumbers .cm-gutterElement": { paddingLeft: "4px", paddingRight: "8px" },
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
        ".cm-foldGutter .cm-gutterElement": { cursor: "pointer", color: muiTheme.palette.text.disabled },
        ".cm-foldPlaceholder": {
          backgroundColor: muiTheme.palette.action.selected,
          border:          `1px solid ${muiTheme.palette.divider}`,
          borderRadius:    "3px",
          color:           muiTheme.palette.text.secondary,
          padding:         "0 4px",
        },
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

    const minimapExtensions = showMinimap
      ? [cmShowMinimap.of({
          create: () => {
            const dom = document.createElement("div");
            dom.style.width           = "80px";
            dom.style.overflow        = "hidden";
            dom.style.borderLeft      = `1px solid ${muiTheme.palette.divider}`;
            dom.style.backgroundColor = isDark
              ? muiTheme.palette.grey[900]
              : muiTheme.palette.grey[50];
            return { dom };
          },
          displayText:  "blocks",
          showOverlay:  "always" as const,
        })]
      : [];

    const extensions = [
      editorTheme,
      syntaxHighlighting(highlightStyle),
      json(),
      lintGutter(),
      linter(jsonParseLinter()),
      linter((view) => {
        const schema = schemaRef.current;
        if (!schema) return [];

        let parsed: unknown;
        try {
          parsed = JSON.parse(view.state.doc.toString());
        } catch {
          return []; // jsonParseLinter already reports syntax errors
        }

        const diagnostics: Diagnostic[] = [];
        for (const error of validateAgainstSchema(parsed, schema)) {
          const range = findRangeForPath(view.state, error.path);
          if (!range) continue;
          diagnostics.push({ from: range.from, to: range.to, severity: "error", message: error.message });
        }
        return diagnostics;
      }),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap]),
      editableCompartment.current.of(EditorView.editable.of(!disabled && !readonly)),
      readOnlyCompartment.current.of(EditorState.readOnly.of(readonly)),
      highlightActiveLine(),
      lineNumbersCompartment.current.of(lineNumbersExtensions(showLineNumbers)),
      foldingCompartment.current.of(foldingExtensions(showFolding)),
      placeholderCompartment.current.of(placeholderExtensions(placeholder)),
      ...minimapExtensions,
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
        click: (event, view) => {
          if (!enablePathFinderRef.current) return false;
          if (!(event.ctrlKey || event.metaKey)) return false;

          let pos: number | null;
          try {
            pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
          } catch {
            // posAtCoords can throw if the click lands before layout has settled.
            return false;
          }
          if (pos === null) return false;

          const path = computeJsonPath(view.state, pos);
          if (!path) return false;

          navigator.clipboard.writeText(path).then(() => {
            const wrapperBox = wrapperRef.current?.getBoundingClientRect();
            setPathFeedback({
              x:    event.clientX - (wrapperBox?.left ?? 0),
              y:    event.clientY - (wrapperBox?.top ?? 0),
              path,
            });
            onPathCopyRef.current?.(path);
          });
          return true;
        },
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
  }, [isDark, propColor, strColor, numColor, boolColor, nullColor, showMinimap]);

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

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: lineNumbersCompartment.current.reconfigure(lineNumbersExtensions(showLineNumbers)),
    });
  }, [showLineNumbers]);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: foldingCompartment.current.reconfigure(foldingExtensions(showFolding)),
    });
  }, [showFolding]);

  useEffect(() => {
    viewRef.current?.dispatch({
      effects: placeholderCompartment.current.reconfigure(placeholderExtensions(placeholder)),
    });
  }, [placeholder]);

  useEffect(() => {
    if (!pathFeedback) return;
    const timer = setTimeout(() => setPathFeedback(null), 1500);
    return () => clearTimeout(timer);
  }, [pathFeedback]);

  return (
    <Box ref={wrapperRef} sx={{ position: "relative", flex: 1, overflow: "hidden", display: "flex" }}>
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

      {pathFeedback && (
        <Fade in>
          <Paper
            elevation={3}
            sx={{
              position:     "absolute",
              left:         pathFeedback.x,
              top:          pathFeedback.y,
              transform:    "translate(-50%, -130%)",
              px:           1,
              py:           0.5,
              pointerEvents: "none",
              zIndex:       10,
              bgcolor:      "grey.900",
              color:        "common.white",
            }}
          >
            <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
              Copied: {pathFeedback.path}
            </Typography>
          </Paper>
        </Fade>
      )}
    </Box>
  );
}
