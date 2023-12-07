import { BasicLayout } from "@Features/Layouts";
import Home from "@Pages/Home";
import SignIn from "@Pages/SignIn";
import SignUp from "@Pages/SignUp";
import Words from "@Pages/Words";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    errorElement: <div>Not found</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/:id/words", element: <Words /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
