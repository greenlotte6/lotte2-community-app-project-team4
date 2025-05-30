import { DrivePage } from "../pages/DrivePage";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/drive", element: <DrivePage /> },
]);
