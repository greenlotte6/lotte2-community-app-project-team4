import React from "react";
import "../../styles/project/aside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectAside = () => {
  const { toggled } = useTheme();
  return (
    <>
      <div className={`project-side-bar ${toggled ? "dark" : "light"}`}>
        <div className="project-side-header">프로젝트 관리</div>
        <div className="project-side-title">
          <FontAwesomeIcon icon={faFolderOpen} />
          프로젝트 리스트
        </div>
        <ul className="project-menu">
          <li>
            프로젝트1 <span></span>
            <br />
            <div className="progress-container">
              <div className="progress-bar" style={{ width: "30%" }}></div>
            </div>
          </li>
          <li>
            프로젝트2 (진행중)
            <br />
            <div className="progress-container">
              <div className="progress-bar" style={{ width: "40%" }}></div>
            </div>
          </li>
          <li>
            프로젝트3 (완료)
            <br />
            <div className="progress-container">
              <div className="progress-bar" style={{ width: "70%" }}></div>
            </div>
          </li>
          <li>
            프로젝트4 (완료)
            <br />
            <div className="progress-container">
              <div className="progress-bar" style={{ width: "60%" }}></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectAside;
