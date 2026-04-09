import LabelIcon from "@mui/icons-material/Label";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagSelectionAutocomplete } from "./TagSelectionAutocomplete";
import type { TagSelectionTranslation } from "./TagSelection.types";

const translation: TagSelectionTranslation = {
  selectedTagsLabel: "Selected tags",
  autoCompleteLabel: "Search and add tags",
  detailsLabel: "All tags",
  noSelectedTagsText: "No tags selected.",
  noAvailableTagsText: "No tags available.",
  placeholder: "Type to search...",
};

const availableTags = [
  {
    id: "react",
    label: "React",
    startIcon: <LabelIcon data-testid="react-icon" />,
  },
  { id: "vitest", label: "Vitest" },
];

describe("TagSelectionAutocomplete", () => {
  it("renders the input and notifies about search changes", async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();

    render(
      <TagSelectionAutocomplete
        availableTags={availableTags}
        searchValue=""
        translation={translation}
        onSearchChange={handleSearchChange}
        onTagSelect={vi.fn()}
        inputSize="small"
        chipSize="medium"
      />,
    );

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "rea");

    expect(handleSearchChange).toHaveBeenLastCalledWith("rea");
    expect(
      screen.getByPlaceholderText("Type to search..."),
    ).toBeInTheDocument();
  });

  it("renders the available tags as chips and selects one option", async () => {
    const user = userEvent.setup();
    const handleTagSelect = vi.fn();

    render(
      <TagSelectionAutocomplete
        availableTags={availableTags}
        searchValue=""
        translation={translation}
        onSearchChange={vi.fn()}
        onTagSelect={handleTagSelect}
        inputSize="medium"
        chipSize="small"
      />,
    );

    const input = screen.getByLabelText("Search and add tags");
    await user.click(input);

    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByText("React")).toBeInTheDocument();
    expect(screen.getByTestId("react-icon")).toBeInTheDocument();

    await user.click(within(listbox).getByText("React"));

    expect(handleTagSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
  });

  it("shows the no-options text and can hide the start icon", async () => {
    const user = userEvent.setup();

    render(
      <TagSelectionAutocomplete
        availableTags={[]}
        searchValue=""
        translation={translation}
        onSearchChange={vi.fn()}
        onTagSelect={vi.fn()}
        showStartIcon={false}
        inputSize="medium"
        chipSize="medium"
      />,
    );

    await user.click(screen.getByLabelText("Search and add tags"));

    expect(await screen.findByText("No tags available.")).toBeInTheDocument();
    expect(screen.queryByTestId("react-icon")).not.toBeInTheDocument();
  });
});
