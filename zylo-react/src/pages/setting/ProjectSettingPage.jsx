import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout.jsx";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import Project from "../../components/setting/Project.jsx";

const ProjectSettingPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <Project />
      </div>
    </BasicLayout>
  );
};

export default ProjectSettingPage;
