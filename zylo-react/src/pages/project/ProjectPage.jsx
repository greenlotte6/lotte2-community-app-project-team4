import ProjectAside from "../../components/project/ProjectAside";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import ProjectContent from "../../components/project/ProjectContent";
import { BasicLayout } from "../../layouts/BasicLayout";

export const ProjectPage = () => {
  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <div id="project-content-container">
          <ProjectContentMenu />
          <ProjectContent />
        </div>
      </div>
    </BasicLayout>
  );
};
