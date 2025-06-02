import { DrivePage } from "../pages/DrivePage";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";
import MyInfoPage from "../pages/setting/MyInfoPage";
import ProfilePage from "../pages/setting/ProfilePage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/drive", element: <DrivePage /> },
  { path: "/setting/MyInfo", element: <MyInfoPage /> },
  { path: "/setting/Profile", element: <ProfilePage /> },
]);
