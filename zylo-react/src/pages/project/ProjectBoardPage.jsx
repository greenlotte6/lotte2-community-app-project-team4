import React from "react";
import { useLocation } from "react-router-dom";
import ProjectAside from "../../components/project/ProjectAside";
import ProjectBoard from "../../components/project/projectBoard/ProjectBoard";
import BasicLayout from "../../layouts/BasicLayout";
import { dummyProjects } from "../../data/project";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";

export const ProjectBoardPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");

  const project = dummyProjects.find((p) => String(p.id) === String(projectId));

  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <div id="project-content-container">
          <ProjectContentMenu />
          <ProjectBoard projectTitle={project.title} />
        </div>
      </div>
    </BasicLayout>
  );
};
