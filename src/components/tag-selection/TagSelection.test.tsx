import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagSelection } from "./TagSelection";
import type { TagSelectionItem } from "./TagSelection.types";

const tags: TagSelectionItem[] = [
  { id: "react",      label: "React",      selected: true, color: "primary" },
  { id: "typescript", label: "TypeScript",                 color: "info" },
  { id: "disabled",   label: "Disabled",   disabled: true },
];

describe("TagSelection", () => {
  it("Should render the default selected tags and autocomplete sections", () => {
    render(<TagSelection tags={tags} />);

    expect(screen.getByText("Selected tags")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByLabelText("Search and add tags")).toBeInTheDocument();
  });

  it("Should hide the selected-tags label when showSelectedTagsLabel is false", () => {
    render(<TagSelection tags={tags} showSelectedTagsLabel={false} />);

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("Should select an available tag and emit all related callbacks", async () => {
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

    expect(handleSearchChange).toHaveBeenCalled();

    await user.click(input);
    await user.click(await screen.findByText("TypeScript"));

    expect(handleTagSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "typescript", selected: true }),
      expect.arrayContaining([
        expect.objectContaining({ id: "react", selected: true }),
        expect.objectContaining({ id: "typescript", selected: true }),
      ]),
      expect.arrayContaining([
        expect.objectContaining({ id: "react" }),
        expect.objectContaining({ id: "typescript", selected: true }),
      ]),
    );

    expect(handleTagsChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: "react", selected: true }),
        expect.objectContaining({ id: "typescript", selected: true }),
      ]),
      expect.arrayContaining([
        expect.objectContaining({ id: "react" }),
        expect.objectContaining({ id: "typescript", selected: true }),
      ]),
    );
  });

  it("Should clear the search input after a tag is selected", async () => {
    const user = userEvent.setup();

    render(<TagSelection tags={tags} />);

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "Type");

    expect(input).toHaveValue("Type");

    await user.click(await screen.findByText("TypeScript"));

    expect(input).toHaveValue("");
  });

  it("Should not allow disabled tags to be selected through the available list", async () => {
    const user = userEvent.setup();

    render(<TagSelection tags={tags} />);

    await user.click(screen.getByLabelText("Search and add tags"));

    expect(screen.queryByText("Disabled")).not.toBeInTheDocument();
  });

  it("Should delete a selected tag and emit delete callbacks", async () => {
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

    await user.click(screen.getByTestId("CancelIcon"));

    expect(handleTagDelete).toHaveBeenCalledTimes(1);
    expect(handleTagsChange).toHaveBeenCalledTimes(1);

    const [deletedTag, selectedTagsAfterDelete, updatedTagsAfterDelete] =
      handleTagDelete.mock.calls[0];

    expect(deletedTag).toEqual(
      expect.objectContaining({ id: "react", label: "React", selected: false }),
    );
    expect(selectedTagsAfterDelete).toEqual([]);
    expect(updatedTagsAfterDelete).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "react", selected: false }),
        expect.objectContaining({ id: "typescript" }),
        expect.objectContaining({ id: "disabled", disabled: true }),
      ]),
    );

    const [selectedTagsFromChange, updatedTagsFromChange] =
      handleTagsChange.mock.calls[0];

    expect(selectedTagsFromChange).toEqual([]);
    expect(updatedTagsFromChange).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "react", selected: false }),
        expect.objectContaining({ id: "typescript" }),
        expect.objectContaining({ id: "disabled", disabled: true }),
      ]),
    );

    expect(screen.getByText("No tags selected.")).toBeInTheDocument();
  });

  it("Should reflect an external tags update in the rendered output", async () => {
    const initialTags: TagSelectionItem[] = [
      { id: "vue", label: "Vue", selected: true },
    ];
    const updatedTags: TagSelectionItem[] = [
      ...initialTags,
      { id: "svelte", label: "Svelte", selected: true },
    ];

    const { rerender } = render(<TagSelection tags={initialTags} />);
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.queryByText("Svelte")).not.toBeInTheDocument();

    rerender(<TagSelection tags={updatedTags} />);
    expect(screen.getByText("Svelte")).toBeInTheDocument();
  });

  it("Should hide both sections when configured", () => {
    render(
      <TagSelection
        tags={tags}
        showSelectedTags={false}
        showAutoComplete={false}
      />,
    );

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Search and add tags")).not.toBeInTheDocument();
  });

  it("Should disable the autocomplete input when disabled is true", () => {
    render(<TagSelection tags={tags} disabled={true} />);

    expect(screen.getByLabelText("Search and add tags")).toBeDisabled();
  });

  it("Should disable chips when the component is disabled", () => {
    render(<TagSelection tags={tags} disabled={true} />);

    const chip = screen.getByText("React").closest(".MuiChip-root");
    expect(chip).toHaveClass("Mui-disabled");
  });

  it("Should show loading text when the autocomplete is open and loading", async () => {
    const user = userEvent.setup();

    render(<TagSelection tags={[]} loading={true} />);

    await user.click(screen.getByLabelText("Search and add tags"));

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
  });

  it("Should disable the autocomplete and show helper text when maxTags is reached", () => {
    render(<TagSelection tags={tags} maxTags={1} />);

    expect(screen.getByLabelText("Search and add tags")).toBeDisabled();
    expect(screen.getByText("Maximum number of tags reached.")).toBeInTheDocument();
  });

  it("Should call onTagCreate with label and color when checkmark is clicked", async () => {
    const user = userEvent.setup();
    const handleTagCreate = vi.fn();

    render(
      <TagSelection tags={tags} allowCreate={true} onTagCreate={handleTagCreate} />,
    );

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "Vue");

    await user.click(await screen.findByTestId("CheckIcon"));

    expect(handleTagCreate).toHaveBeenCalledWith("Vue", "default");
  });

  it("Should auto-select the newly created tag and clear the input", async () => {
    const user = userEvent.setup();

    render(<TagSelection tags={tags} allowCreate={true} />);

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "Vue");

    await user.click(await screen.findByTestId("CheckIcon"));

    expect(input).toHaveValue("");
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  it("Should clear the input when the cancel button is clicked in create mode", async () => {
    const user = userEvent.setup();

    render(<TagSelection tags={tags} allowCreate={true} />);

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "Vue");

    await screen.findByTestId("CheckIcon");

    await user.click(await screen.findByTestId("CloseIcon"));

    expect(input).toHaveValue("");
  });

  it("Should render selected tags in ascending alphabetical order", () => {
    const unsortedTags: TagSelectionItem[] = [
      { id: "vue",        label: "Vue",        selected: true },
      { id: "angular",    label: "Angular",    selected: true },
      { id: "react",      label: "React",      selected: true },
      { id: "typescript", label: "TypeScript", selected: true },
    ];

    render(<TagSelection tags={unsortedTags} />);

    const chipLabels = screen
      .getAllByTestId("CancelIcon")
      .map((icon) => icon.closest(".MuiChip-root")?.querySelector(".MuiChip-label")?.textContent);

    expect(chipLabels).toEqual(["Angular", "React", "TypeScript", "Vue"]);
  });

  it("Should support custom translations", async () => {
    const user = userEvent.setup();

    render(
      <TagSelection
        tags={[]}
        showSelectedTagsLabel={false}
        translation={{
          autoCompleteLabel: "Tags suchen",
          noAvailableTagsText: "Keine Tags verfügbar.",
          placeholder: "Suchen...",
        }}
      />,
    );

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Tags suchen")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Tags suchen"));

    expect(await screen.findByText("Keine Tags verfügbar.")).toBeInTheDocument();
  });
});
