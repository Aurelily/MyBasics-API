import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// components
import Root from "./components/screens/Root";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ProfilScreen from "./components/screens/ProfilScreen";
import HomeScreen from "./components/screens/HomeScreen";
import ErrorScreen from "./components/screens/ErrorScreen";
import UsersListScreen from "./components/screens/UsersListScreen";

// API : myBasic-php-mysql (routeur manuel à base de GETt)
// ---------------------------------------

const appUrl =
  "http://localhost/MyBasics-API/front-back-basic-reactjs-php/api-php-mysql/router.php?";

// Wrapper pour injecter les props
const withProps = (Component, props) => {
  return <Component {...props} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true, // Utiliser "index" au lieu de "path" pour déterminer la route affichée par défaut par l'URL (l'index)
        element: <HomeScreen />,
      },
      {
        path: "/home",
        element: <HomeScreen />,
      },
      {
        path: "/login",
        element: withProps(LoginScreen, { appUrl }),
      },
      {
        path: "/register",
        element: withProps(RegisterScreen, { appUrl }),
      },
      {
        path: "/profil",
        element: withProps(ProfilScreen, { appUrl }),
      },
      {
        path: "/list",
        element: withProps(UsersListScreen, { appUrl }),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
