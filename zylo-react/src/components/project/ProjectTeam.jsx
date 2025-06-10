import React, { useState } from "react";
import "../../styles/project/team.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { dummyMembers, dummyProjectMember } from "../../data/project";
import ProjectInviteModal from "./ProjectInviteModal";
import { useTheme } from "../../contexts/ThemeContext";

const ProjectTeam = () => {
  const { toggled, toggle } = useTheme();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectId = parseInt(params.get("id"), 10);

  const [modal, setModal] = useState(false);

  // 해당 프로젝트의 멤버 ID 추출
  const memberIds = dummyProjectMember
    .filter((pm) => pm.projectId === projectId)
    .map((pm) => pm.memberId);

  // 해당 멤버 ID에 해당하는 멤버 정보 필터링
  const members = dummyMembers.filter((member) =>
    memberIds.includes(member.id)
  );
  return (
    <>
      <div className="project-wrapper">
        <div className="team-management-content">
          <div className="title-area">
            <div>팀원 관리</div>
            <button
              className="team-member-invite-btn"
              onClick={() => setModal(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;&nbsp;&nbsp;팀원 초대
            </button>
            <ProjectInviteModal open={modal} onClose={() => setModal(false)} />
          </div>
          <div className="team-management-content-area">
            {members.length === 0 ? (
              <div>등록된 팀원이 없습니다.</div>
            ) : (
              members.map((member) => (
                <div
                  className={`team-member clickable-project ${
                    toggled ? "dark" : "light"
                  }`}
                  key={member.id}
                >
                  <img
                    className="team-profile"
                    src="/default-profile.png"
                    alt="프로필"
                  />
                  <div className="team-member-info">
                    <div className="team-member-name">{member.name}</div>
                    <div className="team-member-position">{member.role}</div>
                    <div className="team-member-currentStatus">온라인</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTeam;
