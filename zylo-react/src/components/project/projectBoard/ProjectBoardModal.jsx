import { useState } from "react";
import "../../../styles/project/board.css";
import { useLocation } from "react-router-dom";
import { createTask } from "../../../api/projectAPI";
import useProjectStore from "../../../store/useProjectStore";

export const ProjectBoardModal = ({
  setIsModalOpen,
  targetColumnForNewItem,
  onCreateItem,
  projectColumns,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTask = useProjectStore((state) => state.addTask);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const tasks = useProjectStore((state) => state.tasks);

  const handleCreate = async () => {
    try {
      const payload = {
        projectId,
        projectColumns,
        title,
        description,
      };
      payload.projectId = parseInt(payload.projectId, 10);
      payload.projectColumns = parseInt(payload.projectColumns, 10);
      console.log("보내는 데이터:", payload);

      // 로컬 스토리지 추가
      const createdTask = await createTask(payload);
      addTask(createdTask);
      setIsModalOpen(false);
      alert("작업이 생성되었습니다.");
    } catch (err) {
      console.log(err);
      alert("등록 실패");
    }
  };

  return (
    <div className="prodjectBoard-modal-overlay">
      <div className="prodjectBoard-modal-container">
        <div className="prodjectBoard-modal-header">
          <h3>
            작업 제목 <span style={{ color: "red" }}>*</span>
          </h3>
          <input
            type="text"
            className="prodjectBoard-modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="작업 제목을 입력하세요"
            disabled={isSubmitting}
          />
        </div>
        <div className="prodjectBoard-modal-body">
          <h4>작업 설명 </h4>
          <textarea
            className="prodjectBoard-modal-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="작업에 대한 설명을 입력하세요"
            disabled={isSubmitting}
          />
        </div>
        <div className="prodjectBoard-modal-footer">
          <button
            className="prodjectBoard-modal-cancel"
            onClick={() => setIsModalOpen(false)}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            className="prodjectBoard-modal-create"
            onClick={handleCreate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </div>
  );
};
