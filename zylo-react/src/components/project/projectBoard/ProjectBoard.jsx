import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ navigate 추가
import "../../../styles/project/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

const boardData = {
  ready: [
    "RQ-101 랜딩 페이지 구현",
    "RQ-202 약관",
    "RQ-203 회원가입",
    "RQ-300 메인 대시보드 구현",
    "RQ-009 캘린더 화면 구현",
    "RQ-301 페이지 생성",
    "RQ-302 페이지 작성"
  ],
  todo: [],
  inProgress: [
    "RQ-011 게시판 화면 구현",
    "RQ-004 데이터베이스 설계",
    "RQ-012 프로젝트 화면 구현",
    "RQ-201 로그인/로그아웃"
  ],
  inReview: [
    "RQ-010 메시지 화면 구현",
    "RQ-014 설정 화면 구현"
  ],
  done: [
    "RQ-008 페이지 화면 구현",
    "RQ-007 메인 대시보드 구현",
    "RQ-002 화면 설계",
    "RQ-003 프로젝트 아키텍처 설계",
    "RQ-005 메인 화면 구현",
    "RQ-006 회원 화면 구현",
    "RQ-013 드라이브 화면 구현"
  ]
};

const ProjectBoard = ({ projectName }) => {
  const navigate = useNavigate(); // ✅ 훅 사용

  const handleClickProjectTitle = () => {
    navigate("/project"); // ✅ /project 페이지로 이동
  };

  const renderColumn = (title, items, color) => (
    <div className="board-column">
      <div className="board-header" style={{ borderBottom: `2px solid ${color}` }}>
        <span className="board-title" style={{ color }}>{title}</span>
        <span className="board-count">{items.length}</span>
      </div>
      <div className="board-items">
        {items.map((item, idx) => (
          <div key={idx} className="board-card">
            {item}
          </div>
        ))}
        <button className="add-item">+ Add item</button>
      </div>
    </div>
  );

  return (
    <div className="board-wrapper-container">
      <div
        className="project-board-header clickable-header" // ✅ 클릭 가능하도록 클래스 추가
        onClick={handleClickProjectTitle}
      >
        <FontAwesomeIcon icon={faClipboard} className="project-board-icon" />
        <div className="project-board-title">
          {projectName || "프로젝트 이름 없음"}
        </div>
      </div>
      <div className="board-wrapper">
        {renderColumn("Ready", boardData.ready, "#27c93f")}
        {renderColumn("To Do", boardData.todo, "#1c92f2")}
        {renderColumn("In progress", boardData.inProgress, "#ffb400")}
        {renderColumn("In review", boardData.inReview, "#a259ff")}
        {renderColumn("Done", boardData.done, "#ff5722")}
      </div>
    </div>
  );
};

export default ProjectBoard;
