import { DrivePage } from "../pages/drive/DrivePage";
import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";
import { SingUpPage } from "../pages/main/SingUpPage";
import { LoginPage } from "../pages/main/LoginPage";
import { TermPage } from "../pages/main/TermPage";
import MyInfoPage from "../pages/setting/MyInfoPage";
import ProfilePage from "../pages/setting/ProfilePage";
import { MessengerPage } from "../pages/message/MessengerPage";
import CalendarPage from "../pages/setting/CalendarPage";
import MessagePage from "../pages/setting/MessagePage";
import { PlanUpgradePage } from "../pages/plan/PlanUpgradePage";
import { OrderSheetPage } from "../pages/plan/OrderSheetPage";
import { MarkDownPage } from "../pages/markdown/MarkDownPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/drive", element: <DrivePage /> },
  { path: "/signup", element: <SingUpPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/term", element: <TermPage /> },
  { path: "/setting/MyInfo", element: <MyInfoPage /> },
  { path: "/setting/Profile", element: <ProfilePage /> },
  { path: "/setting/Calendar", element: <CalendarPage /> },
  { path: "/setting/Message", element: <MessagePage /> },
  { path: "/messenger", element: <MessengerPage /> },
  { path: "/plan/upgrade", element: <PlanUpgradePage /> },
  { path: "/plan/orderSheet", element: <OrderSheetPage /> },
  { path: "/markdown", element: <MarkDownPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);
