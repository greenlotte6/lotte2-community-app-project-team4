import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import MyInfo from "../../components/setting/MyInfo.jsx";
import "../../styles/setting/myInfo.css";

const MyInfoPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <MyInfo />
      </div>
    </BasicLayout>
  );
};

export default MyInfoPage;
