import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import JobDetails from "../pages/JobDetails";
import PrivateRoute from "./PrivateRoute";
import ApplyJob from "../pages/ApplyJob";
import MyApplications from "../pages/MyApplications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails></JobDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_JOBS_URL}/jobs/${params.id}`),
      },
      {
        path: "job-apply/:id",
        element: <ApplyJob />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_JOBS_URL}/jobs/${params.id}`),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications></MyApplications>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
