import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Meetings from "./routes/meetings.tsx";
import Payments from "./routes/payments.tsx";
import Root from "./routes/root.tsx";
import ErrorPage from "./pages/error-page.tsx";
import {
  getMeetings as meetingsLoader,
  getPayments as paymentsLoader,
} from "@/utils/simulate-db.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { element: <Meetings />, index: true, loader: meetingsLoader },
      { path: "meetings", element: <Meetings />, loader: meetingsLoader },
      { path: "payments", element: <Payments />, loader: paymentsLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
