import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import LinkButton from "../components/LinkButton";

describe("LinkButton Component", () => {
  it("renders the button with children text", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/test">Click Me</LinkButton>
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole("link", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders the button with the correct href", () => {
    render(
      <MemoryRouter>
        <LinkButton to="/test">Click Me</LinkButton>
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole("link", { name: /click me/i });
    expect(buttonElement).toHaveAttribute("href", "/test");
  });

  it("navigates to the correct route when clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<LinkButton to="/test">Click Me</LinkButton>}
          />
          <Route path="/test" element={<div>Test Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", { name: /click me/i });
    fireEvent.click(linkElement);

    expect(screen.getByText("Test Page")).toBeInTheDocument();
  });
});
