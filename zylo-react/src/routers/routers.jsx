import { DrivePage } from "../pages/DrivePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/drive", element: <DrivePage /> },
]);
