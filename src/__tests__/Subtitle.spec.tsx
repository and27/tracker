import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Subtitle from "../components/Subtitle";

describe("Subtitle Component", () => {
  it("renders the subtitle with children text", () => {
    render(<Subtitle title="Subtitle Test" />);
    const subtitleElement = screen.getByText("Subtitle Test");
    expect(subtitleElement).toBeInTheDocument();
  });
});
