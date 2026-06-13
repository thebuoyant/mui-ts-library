import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ConfirmDialogProvider } from "@thebuoyant-tsdev/mui-ts-library";
import { createAppTheme } from "./theme";
import { ChordChartDemo } from "./demos/ChordChartDemo";
import { CirclePackingChartDemo } from "./demos/CirclePackingChartDemo";
import { ConfirmDialogDemo } from "./demos/ConfirmDialogDemo";
import { GanttChartDemo } from "./demos/GanttChartDemo";
import { HorizontalTreeChartDemo } from "./demos/HorizontalTreeChartDemo";
import { JsonEditorDemo } from "./demos/JsonEditorDemo";
import { PasswordStrengthMeterDemo } from "./demos/PasswordStrengthMeterDemo";
import { RadialTreeChartDemo } from "./demos/RadialTreeChartDemo";
import { RichTextEditorDemo } from "./demos/RichTextEditorDemo";
import { SqlEditorDemo } from "./demos/SqlEditorDemo";
import { SunburstChartDemo } from "./demos/SunburstChartDemo";
import { TagSelectionDemo } from "./demos/TagSelectionDemo";

type ComponentSection = {
  id: string;
  name: string;
  description: string;
  render: () => React.ReactNode;
};

const SECTIONS: ComponentSection[] = [
  {
    id: "chord-chart",
    name: "ChordChart",
    description: "Verflechtungsdiagramm für gerichtete oder ungerichtete Flüsse zwischen Gruppen (D3).",
    render: () => <ChordChartDemo />,
  },
  {
    id: "circle-packing-chart",
    name: "CirclePackingChart",
    description: "Hierarchische Kreis-Packing-Visualisierung mit Drill-Down (D3).",
    render: () => <CirclePackingChartDemo />,
  },
  {
    id: "confirm-dialog",
    name: "ConfirmDialog",
    description: "Promise-basierter Bestätigungsdialog über den useConfirm()-Hook.",
    render: () => <ConfirmDialogDemo />,
  },
  {
    id: "gantt-chart",
    name: "GanttChart",
    description: "Interaktiver Gantt-Chart mit Drag & Drop, Abhängigkeiten und Zeitskalen.",
    render: () => <GanttChartDemo />,
  },
  {
    id: "horizontal-tree-chart",
    name: "HorizontalTreeChart",
    description: "Horizontaler Baum für Architektur- oder Organisationsdiagramme (D3).",
    render: () => <HorizontalTreeChartDemo />,
  },
  {
    id: "json-editor",
    name: "JsonEditor",
    description: "JSON-Code-Editor mit Syntax-Highlighting, Validierung und Toolbar (CodeMirror 6).",
    render: () => <JsonEditorDemo />,
  },
  {
    id: "password-strength-meter",
    name: "PasswordStrengthMeter",
    description: "Passwort-Eingabefeld mit Stärke-Anzeige und konfigurierbaren Anforderungen.",
    render: () => <PasswordStrengthMeterDemo />,
  },
  {
    id: "radial-tree-chart",
    name: "RadialTreeChart",
    description: "Radialer Baum für Organisationsdiagramme mit Drill-Down (D3).",
    render: () => <RadialTreeChartDemo />,
  },
  {
    id: "rich-text-editor",
    name: "RichTextEditor",
    description: "WYSIWYG-Editor auf Basis von TipTap mit konfigurierbarer Toolbar.",
    render: () => <RichTextEditorDemo />,
  },
  {
    id: "sql-editor",
    name: "SqlEditor",
    description: "SQL-Code-Editor mit Schema-Autovervollständigung und Dialekt-Unterstützung (CodeMirror 6).",
    render: () => <SqlEditorDemo />,
  },
  {
    id: "sunburst-chart",
    name: "SunburstChart",
    description: "Sunburst-Diagramm für hierarchische Daten mit Zoom (D3).",
    render: () => <SunburstChartDemo />,
  },
  {
    id: "tag-selection",
    name: "TagSelection",
    description: "Tag-Auswahl mit Autocomplete, Erstellung neuer Tags und individuellen Farben.",
    render: () => <TagSelectionDemo />,
  },
];

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfirmDialogProvider>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              @thebuoyant-tsdev/mui-ts-library — Showcase
            </Typography>
            <IconButton onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          {SECTIONS.map((section) => (
            <Accordion key={section.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box>
                  <Typography variant="h6">{section.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>{section.render()}</AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </ConfirmDialogProvider>
    </ThemeProvider>
  );
}

export default App;
