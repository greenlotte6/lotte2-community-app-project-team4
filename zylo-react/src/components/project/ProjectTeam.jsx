import React from "react";
import "../../styles/project/team.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectTeam = () => {
  return (
    <>
      <div class="project-wrapper">
        <div class="team-management-content">
          <div class="title-area">
            <div>팀원 관리</div>
            <button class="team-member-invite-btn">
              <FontAwesomeIcon icon={faPlus} />
              &nbsp;&nbsp;&nbsp;팀원 초대
            </button>
          </div>
          <div class="team-management-content-area">
            <div class="team-member">
              <img class="team-profile" />
              <div class="team-member-info">
                <div class="team-member-name">김철수</div>
                <div class="team-member-position">프로젝트 매니저</div>
                <div class="team-member-currentStatus">온라인</div>
              </div>
            </div>
            <div class="team-member">
              <img class="team-profile" />
              <div class="team-member-info">
                <div class="team-member-name">김철수</div>
                <div class="team-member-position">프로젝트 매니저</div>
                <div class="team-member-currentStatus">온라인</div>
              </div>
            </div>
            <div class="team-member">
              <img class="team-profile" />
              <div class="team-member-info">
                <div class="team-member-name">김철수</div>
                <div class="team-member-position">프로젝트 매니저</div>
                <div class="team-member-currentStatus">온라인</div>
              </div>
            </div>
            <div class="team-member">
              <img class="team-profile" />
              <div class="team-member-info">
                <div class="team-member-name">김철수</div>
                <div class="team-member-position">프로젝트 매니저</div>
                <div class="team-member-currentStatus">온라인</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTeam;
