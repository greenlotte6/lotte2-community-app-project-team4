import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/project/content.css";

const ProjectContent = () => {
  const navigate = useNavigate();

  const handleProjectClick = (e) => {
    // 클릭한 요소 내부에서 .project-title 클래스의 텍스트 가져오기
    const projectTitle = e.currentTarget.querySelector(".project-title")?.textContent || "프로젝트";
    navigate(`/project/board?name=${encodeURIComponent(projectTitle)}`);
  };

  return (
    <div className="project-wrapper">
      <div className="project-item clickable-project" onClick={handleProjectClick}>
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
            <div className="project-progress-container">
              <div
                className="project-progress-bar"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 아래는 예시로 유지 */}
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
  );
};

export default ProjectContent;
