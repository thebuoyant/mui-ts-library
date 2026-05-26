import { useState } from "react";
import { type Editor } from "@tiptap/react";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import {
  type RichTextEditorTranslation,
  type RichTextEditorToolbarConfig,
} from "./RichTextEditor.types";
import { RichTextEditorLinkDialog } from "./RichTextEditorLinkDialog";
import { RichTextEditorColorPicker } from "./RichTextEditorColorPicker";
import { ToolbarButton } from "../shared/ToolbarButton";

type RichTextEditorToolbarProps = {
  editor:               Editor | null;
  toolbarConfig:        Required<RichTextEditorToolbarConfig>;
  translation:          RichTextEditorTranslation;
  disabled?:            boolean;
  isFullscreen:         boolean;
  onToggleFullscreen:   () => void;
};

// Farb-Button mit farbiger Indikatorlinie unter dem Icon
type ColorButtonProps = {
  label:       string;
  icon:        React.ReactNode;
  activeColor: string | null | undefined;
  disabled?:   boolean;
  onClick:     (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function ColorButton({ label, icon, activeColor, disabled, onClick }: ColorButtonProps) {
  return (
    <Tooltip title={label} arrow>
      <span>
        <IconButton
          size="small"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClick}
          disabled={disabled}
          sx={{ borderRadius: 1, flexDirection: "column", gap: 0, pb: 0.25 }}
          aria-label={label}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
          {/* Farbige Indikatorlinie zeigt die aktuell aktive Farbe */}
          <Box
            sx={{
              width:        "80%",
              height:       3,
              bgcolor:      activeColor ?? "text.primary",
              borderRadius: 0.5,
              mt:           "1px",
            }}
          />
        </IconButton>
      </span>
    </Tooltip>
  );
}

function HeadingIcon({ level }: { level: 1 | 2 | 3 }) {
  return (
    <Box component="span" sx={{ fontWeight: "bold", fontSize: "0.875rem", lineHeight: 1 }}>
      H{level}
    </Box>
  );
}

export function RichTextEditorToolbar({
  editor,
  toolbarConfig: tc,
  translation: t,
  disabled,
  isFullscreen,
  onToggleFullscreen,
}: RichTextEditorToolbarProps) {
  const [linkDialogOpen, setLinkDialogOpen]           = useState(false);
  const [colorPickerAnchor, setColorPickerAnchor]     = useState<HTMLElement | null>(null);
  const [highlightPickerAnchor, setHighlightPickerAnchor] = useState<HTMLElement | null>(null);

  const isDisabled = disabled || !editor;

  const activeTextColor  = editor?.getAttributes("textStyle")?.color as string | undefined;
  const activeHighlight  = editor?.getAttributes("highlight")?.color as string | undefined;

  const hasTextGroup =
    tc.showBold || tc.showItalic || tc.showUnderline || tc.showStrike;
  const hasHeadingGroup =
    tc.showHeading1 || tc.showHeading2 || tc.showHeading3;
  const hasListGroup =
    tc.showBulletList || tc.showOrderedList;
  const hasBlockGroup =
    tc.showBlockquote || tc.showCodeBlock || tc.showLink || tc.showHorizontalRule;
  const hasColorGroup =
    tc.showTextColor || tc.showHighlight;
  const hasHistoryGroup =
    tc.showUndoRedo || tc.showClearFormat;

  const groups = [hasTextGroup, hasHeadingGroup, hasListGroup, hasBlockGroup, hasColorGroup, hasHistoryGroup];
  const activeGroupCount = groups.filter(Boolean).length;

  function divider(afterGroup: boolean, groupIndex: number) {
    if (!afterGroup) return null;
    const nextActiveIndex = groups.slice(groupIndex + 1).findIndex(Boolean);
    if (nextActiveIndex === -1) return null;
    return <Divider orientation="vertical" flexItem key={`div-${groupIndex}`} sx={{ mx: 0.5 }} />;
  }

  return (
    <>
      <Box
        sx={{
          display:    "flex",
          flexWrap:   "wrap",
          alignItems: "center",
          gap:        0.25,
          px:         1,
          py:         0.5,
        }}
        role="toolbar"
        aria-label="Text formatting"
      >
        {hasTextGroup && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            {tc.showBold && (
              <ToolbarButton
                label={t.bold}
                icon={<FormatBoldIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleBold().run()}
                active={editor?.isActive("bold")}
                disabled={isDisabled}
              />
            )}
            {tc.showItalic && (
              <ToolbarButton
                label={t.italic}
                icon={<FormatItalicIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                active={editor?.isActive("italic")}
                disabled={isDisabled}
              />
            )}
            {tc.showUnderline && (
              <ToolbarButton
                label={t.underline}
                icon={<FormatUnderlinedIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                active={editor?.isActive("underline")}
                disabled={isDisabled}
              />
            )}
            {tc.showStrike && (
              <ToolbarButton
                label={t.strike}
                icon={<StrikethroughSIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleStrike().run()}
                active={editor?.isActive("strike")}
                disabled={isDisabled}
              />
            )}
          </Box>
        )}

        {divider(hasTextGroup, 0)}

        {hasHeadingGroup && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            {tc.showHeading1 && (
              <ToolbarButton
                label={t.heading1}
                icon={<HeadingIcon level={1} />}
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor?.isActive("heading", { level: 1 })}
                disabled={isDisabled}
              />
            )}
            {tc.showHeading2 && (
              <ToolbarButton
                label={t.heading2}
                icon={<HeadingIcon level={2} />}
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor?.isActive("heading", { level: 2 })}
                disabled={isDisabled}
              />
            )}
            {tc.showHeading3 && (
              <ToolbarButton
                label={t.heading3}
                icon={<HeadingIcon level={3} />}
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                active={editor?.isActive("heading", { level: 3 })}
                disabled={isDisabled}
              />
            )}
          </Box>
        )}

        {divider(hasHeadingGroup, 1)}

        {hasListGroup && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            {tc.showBulletList && (
              <ToolbarButton
                label={t.bulletList}
                icon={<FormatListBulletedIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                active={editor?.isActive("bulletList")}
                disabled={isDisabled}
              />
            )}
            {tc.showOrderedList && (
              <ToolbarButton
                label={t.orderedList}
                icon={<FormatListNumberedIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                active={editor?.isActive("orderedList")}
                disabled={isDisabled}
              />
            )}
          </Box>
        )}

        {divider(hasListGroup, 2)}

        {hasBlockGroup && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            {tc.showBlockquote && (
              <ToolbarButton
                label={t.blockquote}
                icon={<FormatQuoteIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                active={editor?.isActive("blockquote")}
                disabled={isDisabled}
              />
            )}
            {tc.showCodeBlock && (
              <ToolbarButton
                label={t.codeBlock}
                icon={<CodeIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                active={editor?.isActive("codeBlock")}
                disabled={isDisabled}
              />
            )}
            {tc.showLink && (
              <ToolbarButton
                label={t.link}
                icon={<InsertLinkIcon fontSize="small" />}
                onClick={() => setLinkDialogOpen(true)}
                active={editor?.isActive("link")}
                disabled={isDisabled}
              />
            )}
            {tc.showHorizontalRule && (
              <ToolbarButton
                label={t.horizontalRule}
                icon={<HorizontalRuleIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                disabled={isDisabled}
              />
            )}
          </Box>
        )}

        {divider(hasBlockGroup, 3)}

        {hasColorGroup && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            {tc.showTextColor && (
              <ColorButton
                label={t.textColor}
                icon={<FormatColorTextIcon fontSize="small" />}
                activeColor={activeTextColor}
                disabled={isDisabled}
                onClick={(e) => setColorPickerAnchor(e.currentTarget)}
              />
            )}
            {tc.showHighlight && (
              <ColorButton
                label={t.highlight}
                icon={<BorderColorIcon fontSize="small" />}
                activeColor={activeHighlight}
                disabled={isDisabled}
                onClick={(e) => setHighlightPickerAnchor(e.currentTarget)}
              />
            )}
          </Box>
        )}

        {divider(hasColorGroup, 4)}

        {hasHistoryGroup && (
          <Box sx={{ display: "flex", gap: 0.25 }}>
            {tc.showUndoRedo && (
              <>
                <ToolbarButton
                  label={t.undo}
                  icon={<UndoIcon fontSize="small" />}
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={isDisabled || !editor?.can().undo()}
                />
                <ToolbarButton
                  label={t.redo}
                  icon={<RedoIcon fontSize="small" />}
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={isDisabled || !editor?.can().redo()}
                />
              </>
            )}
            {tc.showClearFormat && (
              <ToolbarButton
                label={t.clearFormat}
                icon={<FormatClearIcon fontSize="small" />}
                onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}
                disabled={isDisabled}
              />
            )}
          </Box>
        )}

        {/* Verhindert Layout-Shift wenn activeGroupCount 0 ist */}
        {activeGroupCount === 0 && <Box sx={{ height: 32 }} />}

        {/* Fullscreen-Button: ml: "auto" schiebt ihn an den rechten Rand */}
        {tc.showFullscreenButton && (
          <Box sx={{ ml: "auto" }}>
            <Tooltip title={isFullscreen ? t.exitFullscreen : t.fullscreen} arrow>
              <span>
                <IconButton
                  size="small"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onToggleFullscreen}
                  disabled={disabled || !editor}
                  sx={{ borderRadius: 1 }}
                  aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
                >
                  {isFullscreen
                    ? <FullscreenExitIcon fontSize="small" />
                    : <FullscreenIcon fontSize="small" />
                  }
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
      </Box>

      {tc.showLink && editor && (
        <RichTextEditorLinkDialog
          open={linkDialogOpen}
          onClose={() => setLinkDialogOpen(false)}
          editor={editor}
          translation={t}
        />
      )}

      {tc.showTextColor && (
        <RichTextEditorColorPicker
          anchorEl={colorPickerAnchor}
          open={Boolean(colorPickerAnchor)}
          onClose={() => setColorPickerAnchor(null)}
          mode="textColor"
          activeColor={activeTextColor}
          onSelectColor={(color) => editor?.chain().focus().setColor(color).run()}
          onRemoveColor={() => editor?.chain().focus().unsetColor().run()}
          removeLabel={t.removeTextColor}
        />
      )}

      {tc.showHighlight && (
        <RichTextEditorColorPicker
          anchorEl={highlightPickerAnchor}
          open={Boolean(highlightPickerAnchor)}
          onClose={() => setHighlightPickerAnchor(null)}
          mode="highlight"
          activeColor={activeHighlight}
          onSelectColor={(color) => editor?.chain().focus().setHighlight({ color }).run()}
          onRemoveColor={() => editor?.chain().focus().unsetHighlight().run()}
          removeLabel={t.removeHighlight}
        />
      )}
    </>
  );
}
