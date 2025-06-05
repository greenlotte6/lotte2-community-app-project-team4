import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/project/aside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectAside = () => {
  const { toggled } = useTheme();
  const navigate = useNavigate();

  const handleProjectClick = (projectName) => {
    navigate(`/project/board?name=${encodeURIComponent(projectName)}`);
  };

  return (
    <div className={`project-side-bar ${toggled ? "dark" : "light"}`}>
      <div className="project-side-header">프로젝트 관리</div>
      <div className="project-side-title">
        <FontAwesomeIcon icon={faFolderOpen} />
        프로젝트 리스트
      </div>
      <ul className="project-menu">
        <li onClick={() => handleProjectClick("프로젝트1")}>
          프로젝트1
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "30%" }}></div>
          </div>
        </li>
      </ul>
      <ul className="project-menu">
        <li onClick={() => handleProjectClick("프로젝트2")}>
          프로젝트2
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "30%" }}></div>
          </div>
        </li>
      </ul>
      <ul className="project-menu">
        <li onClick={() => handleProjectClick("프로젝트3")}>
          프로젝트3
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "30%" }}></div>
          </div>
        </li>
      </ul>
      <ul className="project-menu">
        <li onClick={() => handleProjectClick("프로젝트4")}>
          프로젝트4
          <div className="progress-container">
            <div className="progress-bar" style={{ width: "30%" }}></div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProjectAside;
