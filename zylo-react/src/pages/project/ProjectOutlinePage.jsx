import ProjectAside from "../../components/project/ProjectAside";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import ProjectContent from "../../components/project/ProjectContent";
import { BasicLayout } from "../../layouts/BasicLayout";
import useProjectStore from "../../store/useProjectStore";
import { useEffect } from "react";
import { getName, getTask, getTeam } from "../../api/projectAPI";

export const ProjectOutlinePage = () => {
  // zustand 배열 가져오기
  const team = useProjectStore((state) => state.teams);
  const setTeam = useProjectStore((state) => state.setTeams);

  const projects = useProjectStore((state) => state.projects);
  const setProjects = useProjectStore((state) => state.setProjects);

  const tasks = useProjectStore((state) => state.tasks);
  const setTasks = useProjectStore((state) => state.setTasks);

  // projectCollaborators
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeam();
        setTeam(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setTeam]);

  // project
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getName();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setProjects]);

  // task
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTask();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setTasks]);

  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside tasks={tasks} />
        <div id="project-content-container">
          <ProjectContentMenu />
          <ProjectContent team={team} tasks={tasks} />
        </div>
      </div>
    </BasicLayout>
  );
};
