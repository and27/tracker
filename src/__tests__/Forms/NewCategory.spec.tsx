import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewCategory from "../../components/Forms/NewCategory";
import { addCategory } from "../../utils/supabaseDB";

jest.mock("../../utils/supabaseDB", () => ({
  addCategory: jest.fn(),
}));

describe("New Category Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (addCategory as jest.Mock).mockReturnValue(
      Promise.resolve({ data: { name: "Test Category" } })
    );
  });

  it("renders the form", () => {
    render(<NewCategory handleAddCategory={jest.fn()} />);
    const form = screen.getByRole("form", { name: /new category form/i });
    expect(form).toBeInTheDocument();
  });

  it("renders the category input", () => {
    render(<NewCategory handleAddCategory={jest.fn()} />);
    const input = screen.getByLabelText(/category name/i);
    expect(input).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<NewCategory handleAddCategory={jest.fn()} />);
    const button = screen.getByRole("button", { name: /add category/i });
    expect(button).toBeInTheDocument();
  });

  it("do not submit the form when no category is entered", () => {
    const handleSubmit = jest.fn();
    render(<NewCategory handleAddCategory={handleSubmit} />);

    const form = screen.getByRole("form", { name: /new category form/i });
    fireEvent.submit(form);
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  it("submits the form when category is entered", async () => {
    const handleSubmit = jest.fn();
    render(<NewCategory handleAddCategory={handleSubmit} />);

    const input = screen.getByLabelText(/category name/i);
    fireEvent.change(input, { target: { value: "Test Category" } });

    const form = screen.getByRole("form", { name: /new category form/i });
    fireEvent.submit(form);

    expect(addCategory).toHaveBeenCalledTimes(1);
  });
});
