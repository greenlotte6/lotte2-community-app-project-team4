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
import ArticlePage from "../pages/setting/ArticlePage";
import PagePage from "../pages/setting/PagePage";
import DriveSettingPage from "../pages/setting/DrivePage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ListPage } from "../pages/article/ListPage";
import ProjectSettingPage from "../pages/setting/ProjectSettingPage";
import { ProjectPage } from "../pages/project/ProjectPage";

export const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/drive", element: <DrivePage /> },
  { path: "/signup", element: <SingUpPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/term", element: <TermPage /> },
  { path: "/setting/myInfo", element: <MyInfoPage /> },
  { path: "/setting/profile", element: <ProfilePage /> },
  { path: "/setting/calendar", element: <CalendarPage /> },
  { path: "/setting/message", element: <MessagePage /> },
  { path: "/setting/article", element: <ArticlePage /> },
  { path: "/setting/drive", element: <DriveSettingPage /> },
  { path: "/setting/page", element: <PagePage /> },
  { path: "/setting/project", element: <ProjectSettingPage /> },
  { path: "/messenger", element: <MessengerPage /> },
  { path: "/plan/upgrade", element: <PlanUpgradePage /> },
  { path: "/plan/orderSheet", element: <OrderSheetPage /> },
  { path: "/markdown", element: <MarkDownPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/article/list", element: <ListPage /> },
  { path: "/project", element: <ProjectPage /> },
]);
