import ProjectAside from "../../components/project/ProjectAside";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import ProjectContent from "../../components/project/ProjectContent";
import { BasicLayout } from "../../layouts/BasicLayout";
import { useEffect } from "react";
import { getName, getTeam } from "../../api/projectAPI";
import useProjectStore from "../../store/useProjectStore";

export const ProjectPage = () => {
  // zustand 배열 가져오기
  const team = useProjectStore((state) => state.teams);
  const setTeam = useProjectStore((state) => state.setTeams);

  const projects = useProjectStore((state) => state.projects);
  const setprojects = useProjectStore((state) => state.setProjects);

  // project
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeam();
        setTeam(data); // 또는 setProjects(data) 구조에 따라 맞춤
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
        setprojects(data); // 또는 setProjects(data) 구조에 따라 맞춤
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [setprojects]);

  return (
    <BasicLayout title={"프로젝트"}>
      <div id="setting-content-container">
        <ProjectAside />
      </div>
    </BasicLayout>
  );
};
