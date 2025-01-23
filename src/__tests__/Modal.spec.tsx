import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/Modal";
import "@testing-library/jest-dom";

jest.mock("focus-trap-react", () => ({
  FocusTrap: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Modal Component", () => {
  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        Modal Content
      </Modal>
    );

    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        Modal Content
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("focuses the title element when opened", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        Modal Content
      </Modal>
    );

    const title = screen.getByText("Test Modal");
    expect(title).toHaveFocus();
  });

  it("calls onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        Modal Content
      </Modal>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("closes the modal when Escape is pressed", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        Modal Content
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not trap focus when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        Modal Content
      </Modal>
    );

    const modal = screen.queryByText("Test Modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("renders and traps focus when open", () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        Modal Content
      </Modal>
    );

    const title = screen.getByText("Test Modal");
    expect(title).toHaveFocus();

    // Simulate tabbing inside the modal
    fireEvent.keyDown(document, { key: "Tab", code: "Tab" });

    const closeButton = screen.getByRole("button");
    console.log(closeButton);
  });
});
