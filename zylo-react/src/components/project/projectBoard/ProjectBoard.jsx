import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/project/board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useDrag, useDrop } from "react-dnd";

const initialBoardData = {
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

const DraggableCard = ({ item, index, column }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: { item, index, column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [item, index, column]);

  return (
    <div
      ref={dragRef}
      className="board-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item}
    </div>
  );
};

const DroppableColumn = ({ title, items, color, columnKey, onDropCard }) => {
  const [, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (draggedItem) => {
      if (draggedItem.column !== columnKey) {
        onDropCard(draggedItem, columnKey);
        draggedItem.column = columnKey; // 중요: drop된 이후 column을 업데이트함
      }
    },
  }), [onDropCard, columnKey]);

  return (
    <div className="board-column">
      <div className="board-header" style={{ borderBottom: `2px solid ${color}` }}>
        <span className="board-title" style={{ color }}>{title}</span>
        <span className="board-count">{items.length}</span>
      </div>
      <div className="board-items" ref={dropRef}>
        {items.map((item, idx) => (
          <DraggableCard key={idx} item={item} index={idx} column={columnKey} />
        ))}
        <button className="add-item">+ Add item</button>
      </div>
    </div>
  );
};

const ProjectBoard = ({ projectName }) => {
  const navigate = useNavigate();
  const [boardState, setBoardState] = useState(initialBoardData);

  const handleClickProjectTitle = () => {
    navigate("/project");
  };

  const handleDropCard = (draggedItem, targetColumn) => {
    const { item, column } = draggedItem;
    if (column === targetColumn) return;

    setBoardState((prev) => {
      const newSource = prev[column].filter((i) => i !== item);
      const newTarget = [...prev[targetColumn], item];
      return {
        ...prev,
        [column]: newSource,
        [targetColumn]: newTarget,
      };
    });
  };

  return (
    <div className="board-wrapper-container">
      <div
        className="project-board-header clickable-header"
        onClick={handleClickProjectTitle}
      >
        <FontAwesomeIcon icon={faClipboard} className="project-board-icon" />
        <div className="project-board-title">
          {projectName || "프로젝트 이름 없음"}
        </div>
      </div>
      <div className="board-wrapper">
        <DroppableColumn
          title="Ready"
          items={boardState.ready}
          color="#27c93f"
          columnKey="ready"
          onDropCard={handleDropCard}
        />
        <DroppableColumn
          title="To Do"
          items={boardState.todo}
          color="#1c92f2"
          columnKey="todo"
          onDropCard={handleDropCard}
        />
        <DroppableColumn
          title="In progress"
          items={boardState.inProgress}
          color="#ffb400"
          columnKey="inProgress"
          onDropCard={handleDropCard}
        />
        <DroppableColumn
          title="In review"
          items={boardState.inReview}
          color="#a259ff"
          columnKey="inReview"
          onDropCard={handleDropCard}
        />
        <DroppableColumn
          title="Done"
          items={boardState.done}
          color="#ff5722"
          columnKey="done"
          onDropCard={handleDropCard}
        />
      </div>
    </div>
  );
};

export default ProjectBoard;
