import { BasicLayout } from "@Features/Layouts";
import Home from "@Pages/Home";
import SignIn from "@Pages/SignIn";
import SignUp from "@Pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
