"use client";
import { useState, useEffect } from "react";
import "../../../styles/project/board.css";
import { Clipboard } from "lucide-react";
import { useDrag, useDrop } from "react-dnd";
import { ProjectBoardModal } from "./ProjectBoardModal";
import { TaskDetailModal } from "./TaskDetailModal";
import { useLocation } from "react-router-dom";
import useProjectStore from "../../../store/useProjectStore";
import { createTask } from "../../../api/projectAPI";

// 더미데이터를 객체 형태로 변경
const groupTasksByColumn = (tasks) => {
  const columns = {
    ready: [],
    todo: [],
    inProgress: [],
    inReview: [],
    done: [],
  };

  tasks.forEach((task) => {
    const columnName = task.projectColumns.name.toLowerCase();
    let columnKey;

    switch (columnName) {
      case "ready":
        columnKey = "ready";
        break;
      case "to do":
        columnKey = "todo";
        break;
      case "in progress":
        columnKey = "inProgress";
        break;
      case "in review":
        columnKey = "inReview";
        break;
      case "done":
        columnKey = "done";
        break;
      default:
        columnKey = "todo"; // 기본값
    }

    if (columns[columnKey]) {
      columns[columnKey].push(task);
    }
  });

  return columns;
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

  const tasks = useProjectStore((state) => state.tasks);

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

  const loadBoardData = () => {
    try {
      setIsLoading(true);
      // 현재 프로젝트에 해당하는 tasks만 필터링
      const projectTasks = tasks.filter(
        (task) => task.project.id === Number.parseInt(projectId)
      );
      const groupedTasks = groupTasksByColumn(projectTasks);
      setBoardState(groupedTasks);
    } catch (error) {
      console.error("보드 데이터 로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컬럼 이름 → 컬럼 ID 매핑 (더 좋게 하려면 project에서 받아와야 함)
  const columnIdMap = {
    ready: 1,
    todo: 2,
    inProgress: 3,
    inReview: 4,
    done: 5,
  };

  const handleDropCard = async (draggedItem, targetColumn) => {
    const { item, column } = draggedItem;
    if (column === targetColumn) return;

    console.log(
      `[드래그앤드롭] "${item.title}" (id: ${item.id})를 "${column}"에서 "${targetColumn}"로 이동`
    );

    // 1. 낙관적 UI 업데이트
    setBoardState((prev) => {
      const newSource = prev[column].filter((i) => i.id !== item.id);
      const newTarget = [
        ...prev[targetColumn],
        {
          ...item,
          projectColumns: {
            ...item.projectColumns,
            name: targetColumn,
            id: columnIdMap[targetColumn],
          },
        },
      ];
      return {
        ...prev,
        [column]: newSource,
        [targetColumn]: newTarget,
      };
    });

    try {
      // 2. 실제 백엔드에 컬럼 ID 전송
      await fetch(`http://localhost:8081/project/task/${item.id}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          columnId: columnIdMap[targetColumn], // 숫자 ID 전송
        }),
      });

      console.log(
        `[백엔드 저장 성공] Task ID: ${item.id}, Column: ${targetColumn} (ID: ${columnIdMap[targetColumn]})`
      );
    } catch (error) {
      console.error("카드 이동 실패:", error);
      loadBoardData(); // 복구
    }
  };

  const handleClickAddItem = (columnKey) => {
    setTargetColumnForNewItem(columnKey);
    setIsModalOpen(true);
  };

  const handleCreateItem = async (title, desc) => {
    try {
      const columnId = columnIdMap[targetColumnForNewItem];
      const newTask = await createTask(project.id, columnId, title, desc);

      // 상태 업데이트
      setBoardState((prev) => ({
        ...prev,
        [targetColumnForNewItem]: [...prev[targetColumnForNewItem], newTask],
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
      console.log("onUpdateTask 호출됨:", { taskId, newTitle, newDesc });

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
        <div className="project-board-title">{project.name}</div>
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
