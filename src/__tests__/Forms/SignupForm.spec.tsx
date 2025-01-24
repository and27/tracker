import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupForm from "../../components/Forms/Signup";
import useAuth from "../../utils/useAuth";
import { useNavigate } from "react-router-dom";

jest.mock("../../utils/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("SignupForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      signupUser: jest.fn(),
      error: "",
      user: null,
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  it("renders the form", () => {
    render(<SignupForm />);
    const form = screen.getByRole("form", { name: /signup form/i });
    expect(form).toBeInTheDocument();
  });

  it("renders the email input", () => {
    render(<SignupForm />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
  });

  it("renders the password input", () => {
    render(<SignupForm />);
    //se han encotnrado multiple elements with password
    //do specific matching
    const input = screen.getAllByLabelText(/password/i)[0];
    expect(input).toBeInTheDocument();
  });

  it("renders the confirm password input", () => {
    render(<SignupForm />);
    const input = screen.getByLabelText(/confirm password/i);
    expect(input).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<SignupForm />);
    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
  });

  it("calls the signupUser function when submitted", () => {
    const signupUser = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signupUser,
      error: "",
      user: null,
    });

    render(<SignupForm />);
    const button = screen.getByRole("button", { name: /sign up/i });
    button.click();
    expect(signupUser).toHaveBeenCalledTimes(1);
  });
});
