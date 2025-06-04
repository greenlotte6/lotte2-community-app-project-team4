import { DashBoard } from "../../components/dashboard/DashBoard";
import ProejectContentMenu from "../../components/project/ProejectcontentMenu";
import ProjectAside from "../../components/project/ProjectAside";
import { BasicLayout } from "../../layouts/BasicLayout";

export const ProjectPage = () => {
  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <ProejectContentMenu />
      </div>
    </BasicLayout>
  );
};
