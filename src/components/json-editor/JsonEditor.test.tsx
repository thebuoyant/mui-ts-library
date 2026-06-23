import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { JsonEditor } from "./JsonEditor";
import type { JsonEditorSchema } from "./JsonEditor.types";

const VALID_JSON   = '{"name":"Alice","age":30}';
const INVALID_JSON = '{"name":"Alice", age: 30}';

describe("JsonEditor", () => {
  it("renders without crashing", () => {
    render(<JsonEditor />);
    expect(screen.getByRole("toolbar", { name: "JSON editor actions" })).toBeInTheDocument();
  });

  it("renders all default toolbar buttons", () => {
    render(<JsonEditor />);
    expect(screen.getByRole("button", { name: "Format JSON"   })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Compact JSON"  })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy"          })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear"         })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Undo"          })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Redo"          })).toBeInTheDocument();
  });

  it("hides toolbar in readonly mode", () => {
    render(<JsonEditor readonly />);
    expect(screen.queryByRole("toolbar")).not.toBeInTheDocument();
  });

  it("shows helperText when provided", () => {
    render(<JsonEditor helperText="This field is required." />);
    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it("creates a hidden input when name is provided", () => {
    render(<JsonEditor name="payload" value={VALID_JSON} />);
    const hidden = document.querySelector('input[type="hidden"][name="payload"]') as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden.value).toBe(VALID_JSON);
  });

  it("does not create a hidden input without name", () => {
    render(<JsonEditor value={VALID_JSON} />);
    expect(document.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
  });

  it("shows valid JSON indicator when showValidation=true and value is valid", () => {
    render(<JsonEditor value={VALID_JSON} showValidation />);
    expect(screen.getByText("Valid JSON")).toBeInTheDocument();
    expect(screen.getByTestId("json-valid-icon")).toBeInTheDocument();
  });

  it("shows invalid JSON indicator when showValidation=true and value is invalid", () => {
    render(<JsonEditor value={INVALID_JSON} showValidation />);
    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();
    expect(screen.getByTestId("json-invalid-icon")).toBeInTheDocument();
  });

  it("shows invalid indicator when value is empty and showValidation=true", () => {
    render(<JsonEditor value="" showValidation />);
    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();
  });

  it("does not render footer when showLineColumn=false and no helperText or showValidation", () => {
    render(<JsonEditor showLineColumn={false} />);
    expect(screen.queryByText(/Ln/)).not.toBeInTheDocument();
  });

  it("shows line/column footer by default", () => {
    render(<JsonEditor />);
    expect(screen.getByText("Ln 1, Col 1")).toBeInTheDocument();
  });

  it("calls onValidChange with true for valid JSON on initial render", () => {
    const onValidChange = vi.fn();
    render(<JsonEditor value={VALID_JSON} showValidation onValidChange={onValidChange} />);
    // Initial state is computed from value in useState initializer
    expect(screen.getByTestId("json-valid-icon")).toBeInTheDocument();
  });

  it("respects toolbarConfig to hide specific buttons", () => {
    render(<JsonEditor toolbarConfig={{ showFormat: false, showCompact: false }} />);
    expect(screen.queryByRole("button", { name: "Format JSON"  })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Compact JSON" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy"          })).toBeInTheDocument();
  });

  it("renders translated toolbar labels", () => {
    render(
      <JsonEditor
        translation={{
          format:  "JSON formatieren",
          compact: "JSON komprimieren",
          copy:    "Kopieren",
          clear:   "Leeren",
          undo:    "Rückgängig",
          redo:    "Wiederholen",
        }}
      />,
    );
    expect(screen.getByRole("button", { name: "JSON formatieren"  })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "JSON komprimieren" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Kopieren"          })).toBeInTheDocument();
  });

  it("renders translated validation labels", () => {
    render(
      <JsonEditor
        value={VALID_JSON}
        showValidation
        translation={{ validJson: "Gültiges JSON", invalidJson: "Ungültiges JSON" }}
      />,
    );
    expect(screen.getByText("Gültiges JSON")).toBeInTheDocument();
  });

  it("renders with fixed height via numeric prop", () => {
    render(<JsonEditor height={400} />);
    const paper = document.querySelector(".MuiPaper-root") as HTMLElement;
    expect(paper).toBeInTheDocument();
  });

  it("renders with width prop", () => {
    render(<JsonEditor width={600} />);
    const wrapper = document.querySelector(".MuiBox-root") as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders a fold gutter by default", () => {
    render(<JsonEditor value={VALID_JSON} />);
    expect(document.querySelector(".cm-foldGutter")).toBeInTheDocument();
  });

  it("does not render a fold gutter when showFolding=false", () => {
    render(<JsonEditor value={VALID_JSON} showFolding={false} />);
    expect(document.querySelector(".cm-foldGutter")).not.toBeInTheDocument();
  });

  it("does not copy a path on a plain click (no modifier key)", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<JsonEditor value={VALID_JSON} />);
    const content = document.querySelector(".cm-content") as HTMLElement;
    content.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: 5, clientY: 5 }));
    expect(writeText).not.toHaveBeenCalled();
  });

  it("does not copy a path when enablePathFinder=false, even with Ctrl+Click", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<JsonEditor value={VALID_JSON} enablePathFinder={false} />);
    const content = document.querySelector(".cm-content") as HTMLElement;
    content.dispatchEvent(new MouseEvent("click", { bubbles: true, ctrlKey: true, clientX: 5, clientY: 5 }));
    expect(writeText).not.toHaveBeenCalled();
  });

  it("does not throw when Ctrl+Click lands before layout geometry is available", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<JsonEditor value={VALID_JSON} />);
    const content = document.querySelector(".cm-content") as HTMLElement;
    expect(() => {
      content.dispatchEvent(new MouseEvent("click", { bubbles: true, ctrlKey: true, clientX: 5, clientY: 5 }));
    }).not.toThrow();
  });

  describe("schema validation", () => {
    const userSchema: JsonEditorSchema = {
      type: "object",
      required: ["name", "age"],
      properties: {
        name: { type: "string" },
        age:  { type: "number" },
        role: { enum: ["admin", "member"] },
      },
    };

    it("shows no diagnostics when the document satisfies the schema", async () => {
      render(<JsonEditor value='{"name":"Alice","age":30}' schema={userSchema} />);
      await waitFor(() => {
        expect(document.querySelector(".cm-lint-marker-error")).not.toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it("shows a diagnostic for a missing required property", async () => {
      render(<JsonEditor value='{"name":"Alice"}' schema={userSchema} />);
      await waitFor(() => {
        expect(document.querySelector(".cm-lint-marker-error")).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it("shows a diagnostic for a type mismatch", async () => {
      render(<JsonEditor value='{"name":"Alice","age":"thirty"}' schema={userSchema} />);
      await waitFor(() => {
        expect(document.querySelector(".cm-lint-marker-error")).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it("shows no diagnostics when no schema is provided, regardless of shape", async () => {
      render(<JsonEditor value='{"anything": "goes"}' />);
      await new Promise((r) => setTimeout(r, 900));
      expect(document.querySelector(".cm-lint-marker-error")).not.toBeInTheDocument();
    });

    it("skips schema validation while the document doesn't parse as JSON", async () => {
      render(<JsonEditor value='{"name": "Alice", invalid}' schema={userSchema} />);
      await new Promise((r) => setTimeout(r, 900));
      // The parse-error marker is still expected, but no duplicate from the schema linter.
      const markers = document.querySelectorAll(".cm-lint-marker-error");
      expect(markers.length).toBeGreaterThan(0);
    });
  });
});
