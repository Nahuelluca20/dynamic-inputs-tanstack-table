import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Table from "./routes/table/index.tsx";

// routes

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/table",
    // loader: tableLoader,
    element: <Table />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
