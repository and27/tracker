import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
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
import InsightsPage from "./pages/InsightsPage.tsx";
import OnboardingPage from "./pages/OnboardingPage.tsx";
import MissionsPage from "./pages/MissionPage.tsx";
import LogoutPage from "./pages/LogoutPage.tsx";
import App from "./App.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

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
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "transaction",
        element: <TransactionFormPage />,
      },
      {
        path: "insights",
        element: <InsightsPage />,
      },
      {
        path: "mission",
        element: <MissionsPage />,
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
    path: "/onboarding",
    element: <OnboardingPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CategoriesProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </CategoriesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
