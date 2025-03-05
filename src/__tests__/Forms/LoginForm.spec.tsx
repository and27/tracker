import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../../components/Forms/LoginForm";

describe("Login Form Component", () => {
  it("renders the form", () => {
    render(
      <LoginForm
        loginUser={jest.fn()}
        loginError={"test error"}
        loginWithGoogle={jest.fn()}
      />
    );
    const formElement = screen.getByRole("form", { name: /login form/i });
    expect(formElement).toBeInTheDocument();
  });

  it("renders the email input", () => {
    render(
      <LoginForm
        loginUser={jest.fn()}
        loginError={"test error"}
        loginWithGoogle={jest.fn()}
      />
    );
    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the password input", () => {
    render(
      <LoginForm
        loginUser={jest.fn()}
        loginError={"test error"}
        loginWithGoogle={jest.fn()}
      />
    );

    const inputElement = screen.getByLabelText(/password/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    const Form = render(
      <LoginForm
        loginUser={jest.fn()}
        loginError={"test error"}
        loginWithGoogle={jest.fn()}
      />
    );
    const buttonElement = Form.getByRole("button", { name: /Login/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the loginUser function when submitted", () => {
    const loginUser = jest.fn();
    const Form = render(
      <LoginForm
        loginUser={loginUser}
        loginError={"test error"}
        loginWithGoogle={jest.fn()}
      />
    );
    const buttonElement = Form.getByRole("button", { name: /Login/i });
    fireEvent.click(buttonElement);
    expect(loginUser).toHaveBeenCalledTimes(1);
  });
});
