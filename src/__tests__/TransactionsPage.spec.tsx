import { render, screen } from "@testing-library/react";
import TransactionsPage from "../pages/TransactionsPage";
import { useTransactionStore } from "../store/transactionStore";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../store/transactionStore", () => ({
  useTransactionStore: jest.fn(),
}));

describe("TransactionsPage", () => {
  it("shows loading state while fetching transactions", () => {
    (useTransactionStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          transactions: [],
          isLoading: true,
          loadTransactions: jest.fn(),
        })
    );

    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays transactions when loaded", async () => {
    (useTransactionStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          transactions: [
            {
              id: "1",
              description: "Test Transaction",
              amount: 100,
              type: "income",
              categoryName: "Salary",
              paymentMethodName: "Bank Transfer",
            },
          ],
          isLoading: false,
          loadTransactions: jest.fn(),
        })
    );

    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>
    );
    expect(screen.getByText("All your transactions")).toBeInTheDocument();
    expect(await screen.findByText("Test Transaction")).toBeInTheDocument();
    expect(await screen.findByText("$100.00")).toBeInTheDocument();
  });

  //   it("shows 'No transactions found' when there are no transactions", () => {
  //     (useTransactionStore as jest.Mock).mockImplementation((selector) =>
  //       selector({
  //         transactions: [],
  //         isLoading: false,
  //         loadTransactions: jest.fn(),
  //       })
  //     );

  //     render(<TransactionsPage />);
  //     expect(screen.getByText("No transactions found.")).toBeInTheDocument();
  //   });
});
