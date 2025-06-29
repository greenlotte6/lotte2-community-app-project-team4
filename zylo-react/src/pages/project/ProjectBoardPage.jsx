import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProjectAside from "../../components/project/ProjectAside";
import ProjectBoard from "../../components/project/projectBoard/ProjectBoard";
import BasicLayout from "../../layouts/BasicLayout";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import { getTask } from "../../api/projectAPI";
import useProjectStore from "../../store/useProjectStore";

export const ProjectBoardPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");

  const projects = useProjectStore((state) => state.projects);

  const project = projects.find((p) => String(p.id) === String(projectId));

  const tasks = useProjectStore((state) => state.tasks);
  const setTasks = useProjectStore((state) => state.setTasks);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTask();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setTasks]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
        <div id="project-content-container">
          <ProjectContentMenu />
          <ProjectBoard projectTitle={project.title} tasks={tasks} />
        </div>
      </div>
    </BasicLayout>
  );
};
