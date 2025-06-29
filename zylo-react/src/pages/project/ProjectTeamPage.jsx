import ProjectAside from "../../components/project/ProjectAside";
import ProjectContentMenu from "../../components/project/ProjectContentMenu";
import { BasicLayout } from "../../layouts/BasicLayout";
import ProjectTeam from "../../components/project/ProjectTeam";
import { useEffect } from "react";
import { getTeam } from "../../api/projectAPI";
import useProjectStore from "../../store/useProjectStore";

export const ProjectTeamPage = () => {
  // zustand 배열 가져오기
  const team = useProjectStore((state) => state.teams);
  const setTeam = useProjectStore((state) => state.setTeams);
  // projectCollaborators
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
