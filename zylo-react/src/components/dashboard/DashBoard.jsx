import React from "react";
import "../../styles/dashboard/dashboard.css";
import { RecentChats } from "./RecentChats";
import { RecentArticles } from "./RecentArticles";
import { useTheme } from "../../contexts/ThemeContext";

export const DashBoard = () => {
  const { toggled } = useTheme();
  return (
    <div id="dashboard-container" className={toggled ? "dark" : ""}>
      <h1 id="greeting">홍길동 님, 안녕하세요</h1>
      <RecentChats />
      <RecentArticles />
    </div>
  );
};
