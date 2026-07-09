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
};

describe("TagSelectionChip", () => {
  it("Should render a filled chip for selected tags and apply custom colors", () => {
    render(<TagSelectionChip tag={baseTag} chipSize="small" chipVariant="filled" />);

    const chip = screen.getByText("React").closest(".MuiChip-root");

    expect(chip).toHaveClass("MuiChip-filled");
    expect(chip).toHaveStyle({
      color: "rgb(10, 20, 30)",
      backgroundColor: "rgb(200, 210, 220)",
      borderColor: "rgb(200, 210, 220)",
    });
  });

  it("Should render an outlined chip when chipVariant is 'outlined'", () => {
    render(
      <TagSelectionChip
        tag={baseTag}
        chipSize="medium"
        chipVariant="outlined"
      />,
    );

    const chip = screen.getByText("React").closest(".MuiChip-root");

    expect(chip).toHaveClass("MuiChip-outlined");
  });

  it("Should apply a MUI semantic color when color prop is set and no custom colors exist", () => {
    render(
      <TagSelectionChip
        tag={{ id: "ts", label: "TypeScript", selected: true, color: "primary" }}
        chipSize="medium"
        chipVariant="filled"
      />,
    );

    const chip = screen.getByText("TypeScript").closest(".MuiChip-root");

    expect(chip).toHaveClass("MuiChip-colorPrimary");
  });

  it("Should prefer custom colors over the semantic color prop", () => {
    render(
      <TagSelectionChip
        tag={{
          id: "ts",
          label: "TypeScript",
          selected: true,
          color: "primary",
          backgroundColor: "rgb(200, 210, 220)",
        }}
        chipSize="medium"
        chipVariant="filled"
      />,
    );

    const chip = screen.getByText("TypeScript").closest(".MuiChip-root");

    expect(chip).not.toHaveClass("MuiChip-colorPrimary");
    expect(chip).toHaveStyle({ backgroundColor: "rgb(200, 210, 220)" });
  });

  it("Should call onClick and onDelete with the current tag", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleDelete = vi.fn();

    render(
      <TagSelectionChip
        tag={baseTag}
        chipSize="medium"
        chipVariant="filled"
        onClick={handleClick}
        onDelete={handleDelete}
      />,
    );

    await user.click(screen.getByRole("button", { name: "React" }));
    await user.click(screen.getByTestId("CancelIcon"));

    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
    expect(handleDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
  });

  it("Should show the MUI default delete icon when onDelete is set", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(
      <TagSelectionChip
        tag={{ id: "vue", label: "Vue", selected: true }}
        chipSize="medium"
        chipVariant="filled"
        onDelete={handleDelete}
      />,
    );

    const deleteButton = screen.getByTestId("CancelIcon");
    await user.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "vue" }),
    );
  });

  it("Should render disabled chips as not clickable", () => {
    render(
      <TagSelectionChip
        tag={{ ...baseTag, disabled: true, selected: false }}
        chipSize="medium"
        chipVariant="filled"
        onClick={vi.fn()}
      />,
    );

    const chip = screen.getByText("React").closest(".MuiChip-root");

    expect(chip).toHaveClass("Mui-disabled");
    expect(chip).toHaveClass("MuiChip-filled");
    expect(chip).toHaveStyle({ cursor: "default" });
  });
});
