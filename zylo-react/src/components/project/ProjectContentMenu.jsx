import React, { useState } from "react";
import "../../styles/project/contentMenu.css";

const ProjectContentMenu = () => {
  const [selectedTab, setSelectedTab] = useState("tab1"); // 초기값은 '개요'

  const tabs = [
    { id: "tab1", label: "개요" },
    { id: "tab2", label: "팀원" },
    { id: "tab3", label: "업무" },
    { id: "tab5", label: "파일" },
    { id: "tab6", label: "일정" },
    { id: "tab7", label: "통계" },
  ];

  return (
    <>
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
                onChange={() => setSelectedTab(tab.id)}
                style={{ display: "none" }}
              />
              {tab.label}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectContentMenu;
