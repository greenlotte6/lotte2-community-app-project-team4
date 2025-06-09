import React from "react";
import "../../styles/project/contentMenu.css";
import { useNavigate, useLocation } from "react-router-dom";

const ProjectContentMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "tab1", label: "개요", path: "/project" },
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
    navigate(tab.path);
    // 상태 업데이트는 필요 없음: URL로부터 자동 동기화
  };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <label
            key={tab.id}
            className={selectedTab === tab.id ? "active" : ""}
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
