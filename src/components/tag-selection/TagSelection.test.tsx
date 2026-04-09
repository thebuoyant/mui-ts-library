import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagSelection } from "./TagSelection";
import type { TagSelectionItem } from "./TagSelection.types";

const tags: TagSelectionItem[] = [
  {
    id: "react",
    label: "React",
    selected: true,
    startIcon: <LabelIcon data-testid="react-selected-icon" />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "typescript",
    label: "TypeScript",
    startIcon: <LabelIcon data-testid="typescript-icon" />,
    deleteIcon: <CloseIcon />,
  },
  {
    id: "disabled",
    label: "Disabled",
    disabled: true,
    deleteIcon: <CloseIcon />,
  },
];

describe("TagSelection", () => {
  it("renders the default selected tags and autocomplete sections", () => {
    render(<TagSelection tags={tags} />);

    expect(screen.getByText("Selected tags")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByLabelText("Search and add tags")).toBeInTheDocument();
  });

  it("selects an available tag and emits all related callbacks", async () => {
    const user = userEvent.setup();
    const handleTagSelect = vi.fn();
    const handleTagsChange = vi.fn();
    const handleSearchChange = vi.fn();

    render(
      <TagSelection
        tags={tags}
        onTagSelect={handleTagSelect}
        onTagsChange={handleTagsChange}
        onSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "Type");
    expect(handleSearchChange).toHaveBeenLastCalledWith("Type");

    await user.click(input);
    await user.click(await screen.findByText("TypeScript"));

    expect(handleTagSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "typescript", selected: true }),
      expect.arrayContaining([
        expect.objectContaining({ id: "react" }),
        expect.objectContaining({ id: "typescript" }),
      ]),
      expect.arrayContaining([
        expect.objectContaining({ id: "typescript", selected: true }),
      ]),
    );

    expect(handleTagsChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "react" }),
        expect.objectContaining({ id: "typescript" }),
      ]),
      expect.arrayContaining([
        expect.objectContaining({ id: "typescript", selected: true }),
      ]),
    );
  });

  it("does not allow disabled tags to be selected through the available list", async () => {
    const user = userEvent.setup();

    render(<TagSelection tags={tags} />);

    await user.click(screen.getByLabelText("Search and add tags"));

    expect(screen.queryByText("Disabled")).not.toBeInTheDocument();
  });

  it("deletes a selected tag and emits delete callbacks", async () => {
    const user = userEvent.setup();
    const handleTagDelete = vi.fn();
    const handleTagsChange = vi.fn();

    render(
      <TagSelection
        tags={tags}
        onTagDelete={handleTagDelete}
        onTagsChange={handleTagsChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(handleTagDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react", selected: false }),
      expect.not.arrayContaining([expect.objectContaining({ id: "react" })]),
      expect.arrayContaining([
        expect.objectContaining({ id: "react", selected: false }),
      ]),
    );

    expect(handleTagsChange).toHaveBeenCalledWith(
      [],
      expect.arrayContaining([
        expect.objectContaining({ id: "react", selected: false }),
      ]),
    );

    expect(screen.getByText("No tags selected.")).toBeInTheDocument();
  });

  it("can hide both sections when configured", () => {
    render(
      <TagSelection
        tags={tags}
        showSelectedTags={false}
        showAutoComplete={false}
      />,
    );

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("Search and add tags"),
    ).not.toBeInTheDocument();
  });

  it("supports custom translations and icon visibility flags", async () => {
    const user = userEvent.setup();

    render(
      <TagSelection
        tags={tags}
        showStartIcon={false}
        showDeleteIcon={false}
        showSelectedTagsLabel={false}
        translation={{
          selectedTagsLabel: "Ausgewählte Tags",
          autoCompleteLabel: "Tags suchen",
          detailsLabel: "Alle Tags",
          noSelectedTagsText: "Keine Tags ausgewählt.",
          noAvailableTagsText: "Keine Tags verfügbar.",
          placeholder: "Suchen...",
        }}
      />,
    );

    expect(screen.queryByText("Ausgewählte Tags")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Tags suchen")).toBeInTheDocument();
    expect(screen.queryByTestId("react-selected-icon")).not.toBeInTheDocument();

    await user.click(screen.getByLabelText("Tags suchen"));
    expect(screen.queryByTestId("typescript-icon")).not.toBeInTheDocument();
  });
});
