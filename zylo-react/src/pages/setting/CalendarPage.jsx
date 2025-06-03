import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import Calendar from "../../components/setting/Calendar.jsx";

const CalendarPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <Calendar />
      </div>
    </BasicLayout>
  );
};

export default CalendarPage;
