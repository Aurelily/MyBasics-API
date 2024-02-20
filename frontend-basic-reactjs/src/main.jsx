import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

// components
import Root from "./components/screens/Root";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ErrorScreen from "./components/screens/ErrorScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorScreen/>,
    children: [
      {
        path: "/home",
        element: <HomeScreen/>,
      },
      {
        path: "/login",
        element: <LoginScreen/>,
      },
      {
        path: "/register",
        element: <RegisterScreen/>,
      }
    ]
  },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
