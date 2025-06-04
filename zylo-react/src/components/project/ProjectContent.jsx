import React from "react";
import "../../styles/project/content.css";
import ProjectContentMenu from "./ProjectContentMenu";

const ProjectOutline = () => {
  return (
    <>
      <div className="project-wrapper">
        <ProjectContentMenu />
        <div className="project-item">
          <div className="project-title-container">
            <div className="project-title">프로젝트1</div>
            <div className="project-subtitle">
              회사 웹사이트 전면 리뉴얼 프로젝트
            </div>
          </div>
          <div className="project-info">
            <div className="project-startDate">
              <div>시작일</div>
              <div>2024-12-31</div>
            </div>
            <div className="project-endDate">
              <div>종료일</div>
              <div>2025-07-03</div>
            </div>
            <div className="project-progress">
              <div>진행률</div>
              <div class="project-progress-container">
                <div
                  class="project-progress-bar"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-row">
          <div className="project-item">
            <div className="project-row-title">완료된 작업</div>
            <div className="project-row-value">18</div>
            <div className="project-row-total">총 24개 중</div>
          </div>
          <div className="project-item">
            <div className="project-row-title">팀 규모</div>
            <div className="project-row-value">4명</div>
            <div className="project-row-total">참여 인원</div>
          </div>
          <div className="project-item">
            <div className="project-row-title">진행률</div>
            <div className="project-row-value">75%</div>
            <div className="project-row-total">진행중</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOutline;
