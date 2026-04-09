import CloseIcon from "@mui/icons-material/Close";
import LabelIcon from "@mui/icons-material/Label";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagSelectionSelectedTags } from "./TagSelectionSelectedTags";
import type { TagSelectionTranslation } from "./TagSelection.types";

const translation: TagSelectionTranslation = {
  selectedTagsLabel: "Selected tags",
  autoCompleteLabel: "Search and add tags",
  detailsLabel: "All tags",
  noSelectedTagsText: "No tags selected.",
  noAvailableTagsText: "No tags available.",
  placeholder: "Type to search...",
};

describe("TagSelectionSelectedTags", () => {
  it("renders the empty state when no tags are selected", () => {
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

  it("renders selected tags and forwards delete events", async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(
      <TagSelectionSelectedTags
        selectedTags={[
          {
            id: "react",
            label: "React",
            selected: true,
            startIcon: <LabelIcon data-testid="selected-start-icon" />,
            deleteIcon: <CloseIcon />,
          },
        ]}
        translation={translation}
        onTagDelete={handleDelete}
        showSelectedTagsLabel={false}
        chipSize="small"
      />,
    );

    expect(screen.queryByText("Selected tags")).not.toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByTestId("selected-start-icon")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(handleDelete).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
  });
});
