import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputWithLabel from "../../components/Forms/InputWithLabel";

describe("InputWithLabel Component", () => {
  it("renders the input with the correct label", () => {
    render(
      <InputWithLabel label="Test Label" name="test" handleChange={jest.fn()} />
    );
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders the input with the correct name", () => {
    render(
      <InputWithLabel label="Test Label" name="test" handleChange={jest.fn()} />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("name", "test");
  });

  it("renders the input with the correct default type", () => {
    render(
      <InputWithLabel label="Test Label" name="test" handleChange={jest.fn()} />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("renders the input with the correct type when specified", () => {
    render(
      <InputWithLabel
        label="Test Label"
        name="test"
        type="email"
        handleChange={jest.fn()}
      />
    );
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "email");
  });
});
