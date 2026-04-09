import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagSelectionChip } from "./TagSelectionChip";

const baseTag = {
  id: "react",
  label: "React",
  selected: true,
  foregroundColor: "rgb(10, 20, 30)",
  backgroundColor: "rgb(200, 210, 220)",
  startIcon: <LabelIcon data-testid="start-icon" />,
  deleteIcon: <CloseIcon data-testid="delete-icon" />,
};

describe("TagSelectionChip", () => {
  it("Should render a filled chip for selected tags and use custom colors", () => {
    render(<TagSelectionChip tag={baseTag} chipSize="small" />);

    const chip = screen.getByText("React").closest(".MuiChip-root");

    expect(chip).toHaveClass("MuiChip-filled");
    expect(chip).toHaveStyle({
      color: "rgb(10, 20, 30)",
      backgroundColor: "rgb(200, 210, 220)",
      borderColor: "rgb(200, 210, 220)",
    });
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
  });

  it("Should call onClick and onDelete with the current tag", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleDelete = vi.fn();

    render(
      <TagSelectionChip
        tag={baseTag}
        chipSize="medium"
        onClick={handleClick}
        onDelete={handleDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: "React" }));
    await user.click(screen.getByTestId("delete-icon"));

    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
    expect(handleDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
  });

  it("Should hide optional icons when they are disabled via props", () => {
    render(
      <TagSelectionChip
        tag={baseTag}
        chipSize="medium"
        showStartIcon={false}
        showDeleteIcon={false}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delete-icon")).not.toBeInTheDocument();
  });

  it("Should render disabled chips as not clickable", () => {
    render(
      <TagSelectionChip
        tag={{ ...baseTag, disabled: true, selected: false }}
        chipSize="medium"
        onClick={vi.fn()}
      />,
    );

    const chip = screen.getByText("React").closest(".MuiChip-root");

    expect(chip).toHaveClass("Mui-disabled");
    expect(chip).toHaveClass("MuiChip-outlined");
    expect(chip).toHaveStyle({ cursor: "default" });
  });
});
