import React from "react";
import { BasicLayout } from "../../layouts/BasicLayout";
import SettingSideBar from "../../components/setting/SettingSideBar.jsx";
import Project from "../../components/setting/Project.jsx";

const ProjectPage = () => {
  return (
    <BasicLayout title={"설정"}>
      <div id="setting-content-container">
        <SettingSideBar />
        <div className="message-scroll-container">
          <Project />
        </div>
      </div>
    </BasicLayout>
  );
};

export default ProjectPage;
