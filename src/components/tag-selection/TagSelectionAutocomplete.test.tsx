import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { TagSelectionAutocomplete } from "./TagSelectionAutocomplete";
import type {
  TagColor,
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
  maxTagsReachedText: "Maximum number of tags reached.",
};

const availableTags: TagSelectionItem[] = [
  { id: "react",  label: "React",  color: "primary" },
  { id: "vitest", label: "Vitest", color: "success" },
];

type TestWrapperProps = {
  onSearchChange?: (value: string) => void;
  onTagSelect?: (tag: TagSelectionItem) => void;
  onTagCreate?: (label: string, color: TagColor) => void;
  availableTags?: TagSelectionItem[];
  allowCreate?: boolean;
};

function TestWrapper({
  onSearchChange = vi.fn(),
  onTagSelect = vi.fn(),
  onTagCreate,
  availableTags = [],
  allowCreate = false,
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
      onTagCreate={onTagCreate}
      allowCreate={allowCreate}
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

  it("Should show color chips when typing a value with no exact match and allowCreate is true", async () => {
    const user = userEvent.setup();

    render(<TestWrapper availableTags={availableTags} allowCreate />);

    await user.type(screen.getByLabelText("Search and add tags"), "Vue");

    expect(await screen.findByText("default")).toBeInTheDocument();
    expect(screen.getByText("primary")).toBeInTheDocument();
  });

  it("Should call onTagCreate with label and selected color when checkmark is clicked", async () => {
    const user = userEvent.setup();
    const handleCreate = vi.fn();

    render(<TestWrapper availableTags={availableTags} allowCreate onTagCreate={handleCreate} />);

    await user.type(screen.getByLabelText("Search and add tags"), "Vue");
    await user.click(await screen.findByTestId("CheckIcon"));

    expect(handleCreate).toHaveBeenCalledWith("Vue", "default");
  });
});
