import { DrivePage } from "../pages/DrivePage";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";
import { SingUpPage } from "../pages/main/SingUpPage";
import { LoginPage } from "../pages/main/LoginPage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/drive", element: <DrivePage /> },
  { path: "/signup", element: <SingUpPage /> },
  { path: "/login", element: <LoginPage /> },
]);
