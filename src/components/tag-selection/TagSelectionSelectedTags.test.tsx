import { render, screen, within } from "@testing-library/react";
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

  it("Should hide overflow chips behind a +N chip when maxVisibleChips is set", () => {
    render(
      <TagSelectionSelectedTags
        selectedTags={[
          { id: "react",   label: "React",   selected: true },
          { id: "vue",     label: "Vue",     selected: true },
          { id: "svelte",  label: "Svelte",  selected: true },
          { id: "angular", label: "Angular", selected: true },
          { id: "solid",   label: "Solid",   selected: true },
        ]}
        translation={translation}
        onTagDelete={vi.fn()}
        showSelectedTagsLabel
        chipSize="medium"
        maxVisibleChips={3}
      />,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Svelte")).toBeInTheDocument();
    expect(screen.queryByText("Angular")).not.toBeInTheDocument();
    expect(screen.queryByText("Solid")).not.toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("Should open a popover with overflow chips when the +N chip is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TagSelectionSelectedTags
        selectedTags={[
          { id: "react",   label: "React",   selected: true },
          { id: "vue",     label: "Vue",     selected: true },
          { id: "angular", label: "Angular", selected: true },
        ]}
        translation={translation}
        onTagDelete={vi.fn()}
        showSelectedTagsLabel
        chipSize="medium"
        maxVisibleChips={1}
      />,
    );

    expect(screen.queryByText("Vue")).not.toBeInTheDocument();
    await user.click(screen.getByText("+2"));
    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Angular")).toBeInTheDocument();
  });

  it("Should allow deleting overflow chips from the popover", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(
      <TagSelectionSelectedTags
        selectedTags={[
          { id: "react", label: "React",   selected: true },
          { id: "vue",   label: "Vue",     selected: true },
        ]}
        translation={translation}
        onTagDelete={handleDelete}
        showSelectedTagsLabel
        chipSize="medium"
        maxVisibleChips={1}
      />,
    );

    await user.click(screen.getByText("+1"));

    // Popover rendert in einem Portal — nach dem vue-Label suchen und dort klicken
    const popoverVue = screen.getByText("Vue").closest(".MuiChip-root") as HTMLElement;
    await user.click(within(popoverVue).getByTestId("CancelIcon"));

    expect(handleDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "vue" }),
    );
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
