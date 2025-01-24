import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../components/Button";

describe("Button Component", () => {
  it("renders the button with children text", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the correct default type (button)", () => {
    render(<Button>Default Type</Button>);
    const buttonElement = screen.getByRole("button", { name: /default type/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("applies the specified type when passed as a prop", () => {
    render(<Button type="submit">Submit</Button>);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  it("triggers the onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("has the correct class styles", () => {
    render(<Button>Styled Button</Button>);
    const buttonElement = screen.getByRole("button", {
      name: /styled button/i,
    });
    expect(buttonElement).toHaveClass(
      "bg-indigo-600 text-white px-5 mt-5 rounded hover:bg-indigo-700 font-bold text-sm md:text-base"
    );
  });
});
