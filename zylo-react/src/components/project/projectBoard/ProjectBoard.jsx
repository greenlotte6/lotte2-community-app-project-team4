"use client";

import { useState, useEffect } from "react";
import "../../../styles/project/board.css";
import { Clipboard } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import { ProjectBoardModal } from "./ProjectBoardModal";
import { TaskDetailModal } from "./TaskDetailModal";
import { useLocation } from "react-router-dom";
import useProjectStore from "../../../store/useProjectStore";

// 더미데이터를 객체 형태로 변경
const initialBoardData = {
  ready: [
    { id: 1, title: "RQ-101 랜딩 페이지 구현", desc: "" },
    { id: 2, title: "RQ-202 약관", desc: "" },
    { id: 3, title: "RQ-203 회원가입", desc: "" },
    { id: 4, title: "RQ-300 메인 대시보드 구현", desc: "" },
    { id: 5, title: "RQ-009 캘린더 화면 구현", desc: "" },
    { id: 6, title: "RQ-301 페이지 생성", desc: "" },
    { id: 7, title: "RQ-302 페이지 작성", desc: "" },
  ],
  todo: [],
  inProgress: [
    { id: 8, title: "RQ-011 게시판 화면 구현", desc: "" },
    { id: 9, title: "RQ-004 데이터베이스 설계", desc: "" },
    { id: 10, title: "RQ-012 프로젝트 화면 구현", desc: "" },
    { id: 11, title: "RQ-201 로그인/로그아웃", desc: "" },
  ],
  inReview: [
    { id: 12, title: "RQ-010 메시지 화면 구현", desc: "" },
    { id: 13, title: "RQ-014 설정 화면 구현", desc: "" },
  ],
  done: [
    { id: 14, title: "RQ-008 페이지 화면 구현", desc: "" },
    { id: 15, title: "RQ-007 메인 대시보드 구현", desc: "" },
    { id: 16, title: "RQ-002 화면 설계", desc: "" },
    { id: 17, title: "RQ-003 프로젝트 아키텍처 설계", desc: "" },
    { id: 18, title: "RQ-005 메인 화면 구현", desc: "" },
    { id: 19, title: "RQ-006 회원 화면 구현", desc: "" },
    { id: 20, title: "RQ-013 드라이브 화면 구현", desc: "" },
  ],
};

// API 시뮬레이션 함수들
const mockApi = {
  // 보드 데이터 가져오기
  fetchBoardData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialBoardData);
      }, 500); // 0.5초 지연으로 API 호출 시뮬레이션
    });
  },

  // 새 아이템 추가
  createItem: async (title, desc, column) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          id: Date.now(), // 임시 ID 생성
          title,
          desc,
        };
        resolve(newItem);
      }, 300);
    });
  },

  // 아이템 이동
  moveItem: async (itemId, fromColumn, toColumn) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },
};

const DraggableCard = ({ item, index, column, onTaskClick }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "CARD",
      item: () => {
        return { item, index, column };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item, index, column]
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging && onTaskClick) {
      onTaskClick(item, column);
    }
  };

  return (
    <div
      ref={dragRef}
      className="board-card clickable-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleClick}
    >
      <div className="card-title">{item.title}</div>
    </div>
  );
};

const DroppableColumn = ({
  title,
  items,
  color,
  columnKey,
  onDropCard,
  onClickAddItem,
  onTaskClick,
}) => {
  const [, dropRef] = useDrop(
    () => ({
      accept: "CARD",
      drop: (draggedItem) => {
        if (draggedItem.column !== columnKey) {
          onDropCard(draggedItem, columnKey);
          draggedItem.column = columnKey;
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDropCard, columnKey]
  );

  return (
    <div className="board-column" ref={dropRef}>
      <div
        className="board-header"
        style={{ borderBottom: `2px solid ${color}` }}
      >
        <span className="board-title" style={{ color }}>
          {title}
        </span>
        <span className="board-count">{items.length}</span>
      </div>
      <div className="board-items">
        {items.map((item, idx) => (
          <DraggableCard
            key={`${item.id}-${idx}`}
            item={item}
            index={idx}
            column={columnKey}
            onTaskClick={onTaskClick}
          />
        ))}
        <button className="add-item" onClick={() => onClickAddItem(columnKey)}>
          + Add item
        </button>
      </div>
    </div>
  );
};

const ProjectBoard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const projectId = params.get("id");

  // zustand 배열
  const projects = useProjectStore((state) => state.projects);

  const project = projects.find(
    (item) => String(item.id) === String(projectId)
  );

  const [boardState, setBoardState] = useState({
    ready: [],
    todo: [],
    inProgress: [],
    inReview: [],
    done: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetColumnForNewItem, setTargetColumnForNewItem] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskColumn, setSelectedTaskColumn] = useState(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadBoardData();
  }, []);

  const loadBoardData = async () => {
    try {
      setIsLoading(true);
      const data = await mockApi.fetchBoardData();
      setBoardState(data);
    } catch (error) {
      console.error("보드 데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropCard = async (draggedItem, targetColumn) => {
    const { item, column } = draggedItem;
    if (column === targetColumn) return;

    try {
      // 낙관적 업데이트 (UI 먼저 업데이트)
      setBoardState((prev) => {
        const newSource = prev[column].filter((i) => i.id !== item.id);
        const newTarget = [...prev[targetColumn], item];
        return {
          ...prev,
          [column]: newSource,
          [targetColumn]: newTarget,
        };
      });

      // API 호출 (실제로는 백엔드에 이동 요청)
      await mockApi.moveItem(item.id, column, targetColumn);
    } catch (error) {
      console.error("카드 이동 실패:", error);
      // 실패 시 원래 상태로 복구
      loadBoardData();
    }
  };

  const handleClickAddItem = (columnKey) => {
    setTargetColumnForNewItem(columnKey);
    setIsModalOpen(true);
  };

  const handleCreateItem = async (title, desc) => {
    try {
      // API 호출로 새 아이템 생성
      const newItem = await mockApi.createItem(
        title,
        desc,
        targetColumnForNewItem
      );

      // 상태 업데이트
      setBoardState((prev) => ({
        ...prev,
        [targetColumnForNewItem]: [...prev[targetColumnForNewItem], newItem],
      }));

      return true;
    } catch (error) {
      console.error("아이템 생성 실패:", error);
      return false;
    }
  };

  const handleTaskClick = (task, columnKey) => {
    setSelectedTask(task);
    setSelectedTaskColumn(columnKey);
    setIsTaskDetailOpen(true);
  };

  const handleUpdateTask = async (taskId, newTitle, newDesc) => {
    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 상태 업데이트
      setBoardState((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((columnKey) => {
          newState[columnKey] = newState[columnKey].map((task) =>
            task.id === taskId
              ? { ...task, title: newTitle, desc: newDesc }
              : task
          );
        });
        return newState;
      });

      // 선택된 작업 정보도 업데이트
      setSelectedTask((prev) => ({
        ...prev,
        title: newTitle,
        desc: newDesc,
      }));

      return true;
    } catch (error) {
      console.error("작업 업데이트 실패:", error);
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="board-wrapper-container">
        <div className="project-board-header">
          <Clipboard className="project-board-icon" />
          <div className="project-board-title">로딩 중...</div>
        </div>
        <div className="board-wrapper">
          <div style={{ padding: "20px", textAlign: "center" }}>
            데이터를 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="board-wrapper-container">
      {isModalOpen && (
        <ProjectBoardModal
          setIsModalOpen={setIsModalOpen}
          targetColumnForNewItem={targetColumnForNewItem}
          onCreateItem={handleCreateItem}
        />
      )}
      {isTaskDetailOpen && (
        <TaskDetailModal
          task={selectedTask}
          isOpen={isTaskDetailOpen}
          onClose={() => setIsTaskDetailOpen(false)}
          onUpdateTask={handleUpdateTask}
          columnTitle={
            selectedTaskColumn === "inProgress"
              ? "In Progress"
              : selectedTaskColumn === "inReview"
              ? "In Review"
              : selectedTaskColumn.charAt(0).toUpperCase() +
                selectedTaskColumn.slice(1)
          }
        />
      )}
      <div className="project-board-header clickable-header">
        <Clipboard className="project-board-icon" />
        <div className="project-board-title">{project.title}</div>
      </div>
      <div className="board-wrapper">
        <DroppableColumn
          title="Ready"
          items={boardState.ready}
          color="#27c93f"
          columnKey="ready"
          onDropCard={handleDropCard}
          onClickAddItem={handleClickAddItem}
          onTaskClick={handleTaskClick}
        />
        <DroppableColumn
          title="To Do"
          items={boardState.todo}
          color="#1c92f2"
          columnKey="todo"
          onDropCard={handleDropCard}
          onClickAddItem={handleClickAddItem}
          onTaskClick={handleTaskClick}
        />
        <DroppableColumn
          title="In progress"
          items={boardState.inProgress}
          color="#ffb400"
          columnKey="inProgress"
          onDropCard={handleDropCard}
          onClickAddItem={handleClickAddItem}
          onTaskClick={handleTaskClick}
        />
        <DroppableColumn
          title="In review"
          items={boardState.inReview}
          color="#a259ff"
          columnKey="inReview"
          onDropCard={handleDropCard}
          onClickAddItem={handleClickAddItem}
          onTaskClick={handleTaskClick}
        />
        <DroppableColumn
          title="Done"
          items={boardState.done}
          color="#ff5722"
          columnKey="done"
          onDropCard={handleDropCard}
          onClickAddItem={handleClickAddItem}
          onTaskClick={handleTaskClick}
        />
      </div>
    </div>
  );
};

export default ProjectBoard;
