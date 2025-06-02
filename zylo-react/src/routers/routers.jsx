import { DrivePage } from "../pages/DrivePage";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";
import { SingUpPage } from "../pages/main/SingUpPage";
import { LoginPage } from "../pages/main/LoginPage";
import MyInfoPage from "../pages/setting/MyInfoPage";
import ProfilePage from "../pages/setting/ProfilePage";
import { MessengerPage } from "../pages/message/MessengerPage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/drive", element: <DrivePage /> },
  { path: "/signup", element: <SingUpPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/setting/MyInfo", element: <MyInfoPage /> },
  { path: "/setting/Profile", element: <ProfilePage /> },
  { path: "/messenger", element: <MessengerPage /> },
]);
