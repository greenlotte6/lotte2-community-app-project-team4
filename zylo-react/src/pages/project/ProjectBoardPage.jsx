import React from "react";
import { useLocation } from "react-router-dom";
import ProjectAside from "../../components/project/ProjectAside";
import ProjectBoard from "../../components/project/projectBoard/ProjectBoard";
import BasicLayout from "../../layouts/BasicLayout";

export const ProjectBoardPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectName = queryParams.get("name"); // ← 여기서 이름 받아옴

  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <div id="project-content-container">
          <ProjectBoard projectName={projectName} />
        </div>
      </div>
    </BasicLayout>
  );
};
