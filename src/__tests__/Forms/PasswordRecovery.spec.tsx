import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordRecovery from "../../components/Forms/PasswordRecovery";
import { MemoryRouter } from "react-router-dom";

describe("Password Recovery Form Component", () => {
  it("renders the form", () => {
    render(
      <MemoryRouter>
        <PasswordRecovery
          email=""
          setEmail={jest.fn()}
          handleSubmit={jest.fn()}
        />
      </MemoryRouter>
    );
    const form = screen.getByRole("form", { name: /password recovery form/i });
    expect(form).toBeInTheDocument();
  });

  it("renders the email input", () => {
    render(
      <MemoryRouter>
        <PasswordRecovery
          email=""
          setEmail={jest.fn()}
          handleSubmit={jest.fn()}
        />
      </MemoryRouter>
    );
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(
      <MemoryRouter>
        <PasswordRecovery
          email=""
          setEmail={jest.fn()}
          handleSubmit={jest.fn()}
        />
      </MemoryRouter>
    );
    const button = screen.getByRole("button", {
      name: /send password reset email/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("submits the form when clicked", () => {
    const handleSubmit = jest.fn();
    render(
      <MemoryRouter>
        <PasswordRecovery
          email=""
          setEmail={jest.fn()}
          handleSubmit={handleSubmit}
        />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: "test@email.com" } });

    const form = screen.getByRole("form", { name: /password recovery form/i });
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
