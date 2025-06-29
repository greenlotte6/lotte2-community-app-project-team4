import React, { useState } from "react";
import "../../styles/project/team.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import ProjectInviteModal from "./ProjectInviteModal";
import { useTheme } from "../../contexts/ThemeContext";
import useProjectStore from "../../store/useProjectStore";
import { X } from "lucide-react";
import { deleteTeam } from "../../api/projectAPI";

const ProjectTeam = () => {
  const { toggled, toggle } = useTheme();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectId = parseInt(params.get("id"), 10);

  const [modal, setModal] = useState(false);

  const teams = useProjectStore((state) => state.teams);

  const filteredTeams = teams.filter((team) => team.projectId === projectId);

  const removeTeam = useProjectStore((state) => state.removeTeam);

  const clickhandler = (memberId) => {
    const userConfirmed = window.confirm("해당 팀원을 삭제하시겠습니까?");
    if (userConfirmed) {
      const fetchData = async () => {
        try {
          // teams에서 해당 팀원을 찾음
          const targetMember = filteredTeams.find(
            (team) => team.userId === memberId
          );

          const targetMemberId = targetMember.id;
          console.log(targetMemberId);

          if (targetMemberId) {
            await deleteTeam(targetMemberId);
            removeTeam(targetMemberId);
            alert("해당 팀원을 삭제하였습니다.");
          } else {
            alert("해당되는 팀원이 없습니다.");
          }
        } catch (err) {
          console.error(err);
          alert("삭제 중 오류가 발생했습니다.");
        }
      };
      fetchData();
    }
  };

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
            {filteredTeams.length === 0 ? (
              <div>등록된 팀원이 없습니다.</div>
            ) : (
              filteredTeams.map((member) => (
                <div
                  className={`team-member clickable-project ${
                    toggled ? "dark" : "light"
                  }`}
                  key={member.id}
                >
                  <div className="member-info">
                    <img
                      className="team-profile"
                      src="/default-profile.png"
                      alt="프로필"
                    />
                    <div className="team-member-info">
                      <div className="team-member-name">
                        {member.userId}(이름으로)
                      </div>
                      <div className="team-member-position">
                        {member.role}(직책 구현예정)
                      </div>
                      <div className="team-member-currentStatus">
                        온라인(구현예정)
                      </div>
                    </div>
                    <div className="team-delete-btn">
                      <X
                        size={20}
                        onClick={() => clickhandler(member.userId)}
                      />
                    </div>
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
