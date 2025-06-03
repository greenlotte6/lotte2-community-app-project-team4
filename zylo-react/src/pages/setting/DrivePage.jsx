import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import Drive from "../../components/setting/Drive.jsx";

const DriveSettingPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <div className="message-scroll-container">
          <Drive />
        </div>
      </div>
    </BasicLayout>
  );
};

export default DriveSettingPage;
