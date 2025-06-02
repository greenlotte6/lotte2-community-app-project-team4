import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar";
import Profile from "../../components/setting/Profile";
import "../../styles/setting/profile.css";

const ProfilePage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <Profile />
      </div>
    </BasicLayout>
  );
};

export default ProfilePage;
