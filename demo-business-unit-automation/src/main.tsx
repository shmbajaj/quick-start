import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Meetings from "./routes/meetings.tsx";
import Payments from "./routes/payments.tsx";
import Root from "./routes/root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { element: <Meetings />, index: true },
      { path: "meetings", element: <Meetings />, index: true },
      { path: "payments", element: <Payments /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
