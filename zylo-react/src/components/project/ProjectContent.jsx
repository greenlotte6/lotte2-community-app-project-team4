import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/project/content.css";
import useProjectStore from "../../store/useProjectStore";
import { useTheme } from "../../contexts/ThemeContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProjectContent = () => {
  const { toggled, toggle } = useTheme();

  // zustand 배열 가져오기
  const projects = useProjectStore((state) => state.projects);

  const query = useQuery();
  const projectId = query.get("id");

  const project =
    projects.find((p) => String(p.id) === projectId) || "프로젝트 없음";

  return (
    <div className="project-wrapper">
      <div
        className={`project-item clickable-project ${
          toggled ? "dark" : "light"
        }`}
      >
        <div className="project-title-container ">
          <div className="project-title">{project.title}</div>
          <div className="project-subtitle">{project.subtitle}</div>
        </div>
        <div className="project-info">
          <div className="project-startDate">
            <div>시작일</div>
            <div>{project.startDate.substring(0, 10)}</div>
          </div>
          <div className="project-endDate">
            <div>종료일</div>
            <div>{project.endDate.substring(0, 10)}</div>
          </div>
          <div className="project-progress">
            <div>진행률</div>
            <div className="project-progress-container">
              <div
                className="project-progress-bar"
                style={{
                  width:
                    project.totalWork && project.progressWork
                      ? `${Math.round(
                          (project.progressWork / project.totalWork) * 100
                        )}%`
                      : "0%",
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
          <div className="project-row-value">{project.progressWork}개</div>
          <div className="project-row-total">총 {project.totalWork}개 중</div>
        </div>
        <div
          className={`project-item clickable-project  ${
            toggled ? "dark" : "light"
          }`}
        >
          <div className="project-row-title">팀 규모</div>
          <div className="project-row-value">{project.team}명</div>
          <div className="project-row-total">참여 인원</div>
        </div>
        <div
          className={`project-item clickable-project  ${
            toggled ? "dark" : "light"
          }`}
        >
          <div className="project-row-title">진행률</div>
          <div className="project-row-value">
            {project.totalWork && project.progressWork
              ? `${Math.round(
                  (project.progressWork / project.totalWork) * 100
                )}%`
              : "0%"}
          </div>
          <div className="project-row-total">진행중</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
