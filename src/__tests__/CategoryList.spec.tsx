import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCategories } from "../context/CategoriesContext";
import CategoryList from "../components/CategoryList";

jest.mock("../context/CategoriesContext", () => ({
  useCategories: jest.fn(),
}));

describe("CategoryList Component", () => {
  beforeEach(() => {
    (useCategories as jest.Mock).mockReturnValue({
      categories: {
        food: { id: 1, name: "food" },
        housing: { id: 2, name: "housing" },
        custom: { id: 3, name: "custom" },
      },
    });
  });

  it("renders the list of categories", () => {
    render(<CategoryList handleRemoveCategory={jest.fn()} />);

    const categoryItems = screen.getAllByRole("listitem");
    expect(categoryItems).toHaveLength(3);
  });

  it("renders the remove button only for non-default categories", () => {
    const mockHandleRemoveCategory = jest.fn();
    render(<CategoryList handleRemoveCategory={mockHandleRemoveCategory} />);

    const removeButtons = screen.getAllByText(/remove category/i);
    expect(removeButtons).toHaveLength(1);

    fireEvent.click(removeButtons[0]);
    expect(mockHandleRemoveCategory).toHaveBeenCalledWith("custom");
  });
});
