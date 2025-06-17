import { useState } from "react";
import "../../../styles/project/board.css";

export const ProjectBoardModal = ({
  setIsModalOpen,
  targetColumnForNewItem,
  onCreateItem,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createHandler = async () => {
    if (!title.trim()) {
      alert("작업 제목을 입력하세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await onCreateItem(title, desc);

      if (success) {
        setTitle("");
        setDesc("");
        setIsModalOpen(false);
      } else {
        alert("작업 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("작업 생성 오류:", error);
      alert("작업 생성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
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
          <h4>작업 설명</h4>
          <textarea
            className="prodjectBoard-modal-textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            onClick={createHandler}
            disabled={isSubmitting}
          >
            {isSubmitting ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </div>
  );
};
