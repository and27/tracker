import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OverviewPage from "../pages/OverviewPage";
import { MemoryRouter } from "react-router-dom";

jest.mock("../utils/supabaseDB", () => {
  return {
    getLastTransactions: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          description: "Test transaction",
          amount: 100,
          type: "expense",
          category: { name: "Food" },
        },
      ],
    }),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Overview Page", () => {
  it("renders the overview page", () => {
    render(
      <MemoryRouter>
        <OverviewPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/ALERTA FINANCIERA/i)).toBeInTheDocument();
  });

  it("Insights button navigates to insights route", async () => {
    render(
      <MemoryRouter>
        <OverviewPage />
      </MemoryRouter>
    );

    const link = screen.getByText(/view more/i);
    expect(link).toHaveAttribute("href", "/account/insights");

    await link.click();
    expect(link).toBeInTheDocument();
  });
});
