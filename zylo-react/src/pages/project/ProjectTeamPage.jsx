import ProjectAside from "../../components/project/ProjectAside";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import { BasicLayout } from "../../layouts/BasicLayout";
import ProjectTeam from "../../components/project/ProjectTeam";

export const ProjectTeamPage = () => {
  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <div id="project-content-container">
          <ProjectContentMenu />
          <ProjectTeam />
        </div>
      </div>
    </BasicLayout>
  );
};
