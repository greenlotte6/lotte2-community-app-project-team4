import React from "react";
import "../../styles/project/contentMenu.css";
import { useNavigate, useLocation } from "react-router-dom";
import useProjectStore from "../../store/useProjectStore";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectContentMenu = () => {
  const { toggled, toggle } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  // 쿼리 파라미터에서 프로젝트 ID 추출
  const params = new URLSearchParams(location.search);
  const projectId = params.get("id");

  const projects = useProjectStore((state) => state.projects);
  const project = projects.find((p) => String(p.id) === String(projectId));

  const tabs = [
    { id: "tab1", label: "개요", path: "/project/outline" },
    { id: "tab2", label: "팀원", path: "/project/team" },
    { id: "tab3", label: "업무", path: "/project/task" },
  ];

  // URL에 따라 active 탭 결정
  const getSelectedTab = () => {
    const found = tabs.find((tab) => location.pathname === tab.path);
    return found ? found.id : "tab1";
  };

  const selectedTab = getSelectedTab();

  const handleTabChange = (tab) => {
    navigate(`${tab.path}?id=${projectId}`);
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <label
            key={tab.id}
            className={`${selectedTab === tab.id ? "active" : ""} ${
              toggled ? "dark" : "light"
            }`}
          >
            <input
              type="radio"
              name="tab"
              value={tab.id}
              checked={selectedTab === tab.id}
              onChange={() => handleTabChange(tab)}
              style={{ display: "none" }}
            />
            {tab.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProjectContentMenu;
