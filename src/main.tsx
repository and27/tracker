import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import TransactionFormPage from "./pages/TransactionFormPage.tsx";
import OverviewPage from "./pages/OverviewPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SettingPage from "./pages/SettingsPage.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import { CategoriesProvider } from "./context/CategoriesContext.tsx";
import PasswordReset from "./pages/PasswordReset.tsx";
import PasswordRecovery from "./pages/PasswordRecoverys.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MissionsPage from "./pages/MissionPage.tsx";
import App from "./App.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import FinancialProfilePage from "./pages/FinancialProfilePage.tsx";
import BudgetPage from "./pages/BudgetPage.tsx";

const router = createBrowserRouter([
  {
    path: "/account",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <OverviewPage />,
      },
      {
        path: "transactions",
        element: <TransactionsPage />,
      },
      {
        path: "transaction",
        element: <TransactionFormPage />,
      },
      {
        path: "explore",
        element: <ReportsPage />,
      },
      {
        path: "mission",
        element: <MissionsPage />,
      },
      {
        path: "budget",
        element: <BudgetPage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/password-recovery",
    element: <PasswordRecovery />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    element: <PasswordReset />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/financialProfile",
    element: <FinancialProfilePage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CategoriesProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </CategoriesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
