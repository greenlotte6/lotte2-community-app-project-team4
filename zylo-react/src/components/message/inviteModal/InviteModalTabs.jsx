import React from "react";

export const InviteModalTabs = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className="invite-modal-header">
        <h2>대화상대 초대</h2>
      </div>

      <div className="invite-modal-tabs">
        <button
          className={`tab ${activeTab === "search" ? "active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          사용자 검색
        </button>
        <button
          className={`tab ${activeTab === "marks" ? "active" : ""}`}
          onClick={() => setActiveTab("marks")}
        >
          즐겨찾기
        </button>
      </div>
    </>
  );
};
