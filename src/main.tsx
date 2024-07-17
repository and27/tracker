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
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const router = createBrowserRouter([
  {
    path: "/account",
    element: <Layout />,
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
    path: "login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "logout",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
