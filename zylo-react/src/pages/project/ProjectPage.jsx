import ProjectAside from "../../components/project/ProjectAside";
import ProjectOutline from "../../components/project/ProjectContent";
import { BasicLayout } from "../../layouts/BasicLayout";

export const ProjectPage = () => {
  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <div id="project-content-container">
          <ProjectOutline />
        </div>
      </div>
    </BasicLayout>
  );
};
