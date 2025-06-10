import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/project/aside.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../contexts/ThemeContext";
import useProjectStore from "../../store/useProjectStore";
import { ProjectRegisterModal } from "./ProjectRegisterModal.jsx";

const ProjectAside = () => {
  const { toggled } = useTheme();
  const navigate = useNavigate();

  // 프로젝트 id 읽어오기
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedProjectId = params.get("id");

  // zustand 배열 가져오기
  const projects = useProjectStore((state) => state.projects);

  const handleProjectClick = (projectId) => {
    navigate(`/project?id=${encodeURIComponent(projectId)}`);
  };

  const [modal, setModal] = useState(false);

  return (
    <div className={`project-side-bar ${toggled ? "dark" : "light"}`}>
      <div className="project-side-header">프로젝트 관리</div>
      <div className="project-side-title">
        <FontAwesomeIcon icon={faFolderOpen} />
        &nbsp;프로젝트 리스트
        <span
          onClick={() => {
            setModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
        {modal && <ProjectRegisterModal modal={modal} setModal={setModal} />}
      </div>
      <ul className="project-menu">
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className={
              String(project.id) === String(selectedProjectId) ? "selected" : ""
            }
          >
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
