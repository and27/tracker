import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/transactions",
    element: <TransactionsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reports",
    element: <ReportsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
