import React, { use, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/project/content.css";
import useProjectStore from "../../store/useProjectStore";
import { useTheme } from "../../contexts/ThemeContext";
import { getTeam } from "../../api/projectAPI";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProjectContent = ({ team, tasks }) => {
  const { toggled, toggle } = useTheme();
  const projects = useProjectStore((state) => state.projects);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectId = parseInt(params.get("id"), 10);

  const setTeams = useProjectStore((state) => state.setTeams);

  const project = projects.find((pm) => pm.id === projectId);

  console.log(tasks);

  // 해당 프로젝트의 멤버 ID 추출
  const members = team.filter(
    (pm) => Number(pm.projectId) === Number(projectId)
  );
  const filterTasks = tasks.filter(
    (task) => Number(task.project.id) === Number(projectId)
  );

  const countTasks = filterTasks.length;
  const doneTasks = filterTasks.filter(
    (task) => Number(task.projectColumns.id) === Number(5)
  );
  const countDoneTasks = doneTasks.length;
  const progress = (countDoneTasks / countTasks) * 100;

  useEffect(() => {
    getTeam().then((data) => setTeams(data));
  }, [projectId]);

  // 멤버 인원수
  const memberCount = members.length;

  return (
    <div className="project-wrapper">
      <div
        className={`project-item clickable-project ${
          toggled ? "dark" : "light"
        }`}
      >
        <div className="project-title-container ">
          <div className="project-title">{project?.name}</div>
          <div className="project-subtitle">{project?.description}</div>
        </div>
        <div className="project-info">
          <div className="project-startDate">
            <div>시작일</div>
            <div>{(project?.startDate || "").substring(0, 10)}</div>
          </div>
          <div className="project-endDate">
            <div>종료일</div>
            <div>{(project?.endDate || "").substring(0, 10)}</div>
          </div>
          <div className="project-progress">
            <div>진행률</div>
            <div className="project-progress-container">
              <div
                className="progress-bar"
                style={{
                  width: `${progress || 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-row">
        <div
          className={`project-item clickable-project  ${
            toggled ? "dark" : "light"
          }`}
        >
          <div className="project-row-title">완료된 작업</div>
          <div className="project-row-value">{countDoneTasks}개</div>
          <div className="project-row-total">총 {countTasks}개 중</div>
        </div>
        <div
          className={`project-item clickable-project  ${
            toggled ? "dark" : "light"
          }`}
        >
          <div className="project-row-title">팀 규모</div>
          <div className="project-row-value">{memberCount}명</div>
          <div className="project-row-total">참여 인원</div>
        </div>
        <div
          className={`project-item clickable-project  ${
            toggled ? "dark" : "light"
          }`}
        >
          <div className="project-row-title">진행률</div>
          <div className="project-row-value">{`${progress || 0}%`}</div>
          <div className="project-row-total">진행중</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
