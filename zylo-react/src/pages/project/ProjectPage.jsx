import ProjectAside from "../../components/project/ProjectAside";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import ProjectContent from "../../components/project/ProjectContent";
import { BasicLayout } from "../../layouts/BasicLayout";

export const ProjectPage = () => {
  const dummyProjects = [
    {
      id: 1,
      title: "프로젝트1",
      subtitle: "회사 웹사이트 전면 리뉴얼 프로젝트",
      startDate: "2024-12-31",
      endDate: "2025-07-03",
      progress: 30,
      completedTasks: 18,
      totalTasks: 24,
      teamSize: 4,
      status: "진행중",
    },
    {
      id: 2,
      title: "프로젝트2",
      subtitle: "모바일 앱 개발",
      startDate: "2025-01-15",
      endDate: "2025-08-20",
      progress: 75,
      completedTasks: 45,
      totalTasks: 60,
      teamSize: 6,
      status: "진행중",
    },
    {
      id: 3,
      title: "프로젝트3",
      subtitle: "모바일 앱 개발",
      startDate: "2025-01-15",
      endDate: "2025-08-20",
      progress: 75,
      completedTasks: 45,
      totalTasks: 60,
      teamSize: 6,
      status: "진행중",
    },
  ];

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
