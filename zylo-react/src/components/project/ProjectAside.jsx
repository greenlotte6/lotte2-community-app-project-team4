import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/project/aside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";
import useProjectStore from "../../store/useProjectStore";

const ProjectAside = () => {
  const { toggled } = useTheme();
  const navigate = useNavigate();

  // zustand 배열 가져오기
  const projects = useProjectStore((state) => state.projects);

  const handleProjectClick = (projectId) => {
    navigate(`/project?id=${encodeURIComponent(projectId)}`);
  };

  return (
    <div className={`project-side-bar ${toggled ? "dark" : "light"}`}>
      <div className="project-side-header">프로젝트 관리</div>
      <div className="project-side-title">
        <FontAwesomeIcon icon={faFolderOpen} />
        프로젝트 리스트
      </div>
      <ul className="project-menu">
        {projects.map((project) => (
          <li key={project.id} onClick={() => handleProjectClick(project.id)}>
            {project.title}
            <div className="progress-container">
              <div
                className="progress-bar"
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectAside;
