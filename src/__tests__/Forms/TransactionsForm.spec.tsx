import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "react-toastify/dist/ReactToastify.css";
import TransactionForm from "../../components/Forms/TransactionForm";
import { createTransaction } from "../../utils/supabaseDB";

jest.mock("react-toastify/dist/ReactToastify.css", () => jest.fn());
jest.mock("../../utils/supabaseDB", () => ({
  createTransaction: jest.fn(),
}));

describe("Transactions Form Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (createTransaction as jest.Mock).mockReturnValue(
      Promise.resolve({ data: { name: "Test Transaction" } })
    );
  });

  it("renders form ", () => {
    render(<TransactionForm />);
    const formElement = screen.getByRole("form", { name: /transaction form/i });
    expect(formElement).toBeInTheDocument();
  });
});
