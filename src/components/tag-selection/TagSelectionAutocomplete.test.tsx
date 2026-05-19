import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { TagSelectionAutocomplete } from "./TagSelectionAutocomplete";
import type {
  TagSelectionItem,
  TagSelectionTranslation,
} from "./TagSelection.types";

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

const availableTags: TagSelectionItem[] = [
  { id: "react",  label: "React",  color: "primary" },
  { id: "vitest", label: "Vitest", color: "success" },
];

type TestWrapperProps = {
  onSearchChange?: (value: string) => void;
  onTagSelect?: (tag: TagSelectionItem) => void;
  availableTags?: TagSelectionItem[];
};

function TestWrapper({
  onSearchChange = vi.fn(),
  onTagSelect = vi.fn(),
  availableTags = [],
}: TestWrapperProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <TagSelectionAutocomplete
      availableTags={availableTags}
      searchValue={searchValue}
      translation={translation}
      onSearchChange={(value) => {
        setSearchValue(value);
        onSearchChange(value);
      }}
      onTagSelect={(tag) => {
        setSearchValue("");
        onTagSelect(tag);
      }}
      inputSize="medium"
      chipSize="medium"
    />
  );
}

describe("TagSelectionAutocomplete", () => {
  it("Should render the input and notify about search changes", async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();

    render(
      <TestWrapper
        availableTags={availableTags}
        onSearchChange={handleSearchChange}
      />,
    );

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "rea");

    expect(handleSearchChange).toHaveBeenLastCalledWith("rea");
    expect(input).toHaveValue("rea");
    expect(
      screen.getByPlaceholderText("Type to search..."),
    ).toBeInTheDocument();
  });

  it("Should render the available tags as chips and select one option", async () => {
    const user = userEvent.setup();
    const handleTagSelect = vi.fn();

    render(
      <TestWrapper
        availableTags={availableTags}
        onTagSelect={handleTagSelect}
      />,
    );

    const input = screen.getByLabelText("Search and add tags");
    await user.click(input);

    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).getByText("React")).toBeInTheDocument();

    await user.click(within(listbox).getByText("React"));

    expect(handleTagSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "react" }),
    );
  });

  it("Should clear the input after a tag is selected", async () => {
    const user = userEvent.setup();

    render(<TestWrapper availableTags={availableTags} />);

    const input = screen.getByLabelText("Search and add tags");
    await user.type(input, "Rea");

    expect(input).toHaveValue("Rea");

    await user.click(await screen.findByText("React"));

    expect(input).toHaveValue("");
  });

  it("Should show the no-options text when no tags are available", async () => {
    const user = userEvent.setup();

    render(<TestWrapper availableTags={[]} />);

    await user.click(screen.getByLabelText("Search and add tags"));

    expect(await screen.findByText("No tags available.")).toBeInTheDocument();
  });
});
