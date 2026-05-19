import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagSelectionSelectedTags } from "./TagSelectionSelectedTags";
import type { TagSelectionTranslation } from "./TagSelection.types";

const translation: TagSelectionTranslation = {
  selectedTagsLabel: "Selected tags",
  autoCompleteLabel: "Search and add tags",
  noSelectedTagsText: "No tags selected.",
  noAvailableTagsText: "No tags available.",
  placeholder: "Type to search...",
  loadingText: "Loading...",
  createTagLabel: "Create '{query}'",
  maxTagsReachedText: "Maximum number of tags reached.",
};

describe("TagSelectionSelectedTags", () => {
  it("Should render the empty state when no tags are selected", () => {
    render(
      <TagSelectionSelectedTags
        selectedTags={[]}
        translation={translation}
        onTagDelete={vi.fn()}
        showSelectedTagsLabel
        chipSize="medium"
      />,
    );

    expect(screen.getByText("Selected tags")).toBeInTheDocument();
    expect(screen.getByText("No tags selected.")).toBeInTheDocument();
  });

  it("Should render selected tags and forward delete events", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(
      <TagSelectionSelectedTags
        selectedTags={[{ id: "react", label: "React", selected: true }]}
        translation={translation}
        onTagDelete={handleDelete}
        showSelectedTagsLabel={false}
        chipSize="small"
      />,
    );

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();

    await user.click(screen.getByTestId("CancelIcon"));

    expect(handleDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
  });

  it("Should render multiple selected tags", () => {
    render(
      <TagSelectionSelectedTags
        selectedTags={[
          { id: "react", label: "React", selected: true },
          { id: "vue", label: "Vue", selected: true },
          { id: "svelte", label: "Svelte", selected: true },
        ]}
        translation={translation}
        onTagDelete={vi.fn()}
        showSelectedTagsLabel
        chipSize="medium"
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Svelte")).toBeInTheDocument();
    expect(screen.queryByText("No tags selected.")).not.toBeInTheDocument();
  });

  it("Should not render the label when showSelectedTagsLabel is false", () => {
    render(
      <TagSelectionSelectedTags
        selectedTags={[]}
        translation={translation}
        onTagDelete={vi.fn()}
        showSelectedTagsLabel={false}
        chipSize="medium"
      />,
    );

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(screen.getByText("No tags selected.")).toBeInTheDocument();
  });
});
