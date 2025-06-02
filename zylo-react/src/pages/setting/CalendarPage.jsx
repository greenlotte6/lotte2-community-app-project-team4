import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";

const CalendarPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
      </div>
    </BasicLayout>
  );
};

export default CalendarPage;
