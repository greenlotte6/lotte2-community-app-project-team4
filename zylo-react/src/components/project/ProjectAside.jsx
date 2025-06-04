import React from "react";
import "../../styles/project/aside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const ProjectAside = () => {
  return (
    <>
      <div class="project-side-bar">
        <div class="project-side-header">프로젝트 관리</div>
        <div class="project-side-title">
          <FontAwesomeIcon icon={faFolderOpen} />
          프로젝트 리스트
        </div>
        <ul class="project-menu">
          <li>
            프로젝트1 (계획)
            <br />
            <div class="progress-container">
              <div class="progress-bar" style={{ width: "30%" }}></div>
            </div>
          </li>
          <li>
            프로젝트2 (진행중)
            <br />
            <div class="progress-container">
              <div class="progress-bar" style={{ width: "40%" }}></div>
            </div>
          </li>
          <li>
            프로젝트3 (완료)
            <br />
            <div class="progress-container">
              <div class="progress-bar" style={{ width: "70%" }}></div>
            </div>
          </li>
          <li>
            프로젝트4 (완료)
            <br />
            <div class="progress-container">
              <div class="progress-bar" style={{ width: "60%" }}></div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectAside;
