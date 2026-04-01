import { createBrowserRouter } from "react-router";
import Home from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);
