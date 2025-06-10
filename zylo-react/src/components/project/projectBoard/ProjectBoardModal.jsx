import React, { useState } from "react";
import "../../../styles/project/modal.css";

export const ProjectBoardModal = ({ modal, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const createHandler = () => {
    if (!title.trim()) {
      alert("작업 제목을 입력하세요.");
      return;
    }

    onCreate({ title, desc });
    setTitle("");
    setDesc("");
    onClose();
  };

  if (!modal) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>
            작업 제목 <span style={{ color: "red" }}>*</span>
          </h3>
          <input
            type="text"
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="project-modal-body">
          <h4>작업 설명</h4>
          <textarea
            className="modal-textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="project-modal-footer">
          <button
            className="modal-cancel"
            onClick={() => {
              onClose();
            }}
          >
            취소
          </button>
          <button className="modal-create" onClick={createHandler}>
            생성
          </button>
        </div>
      </div>
    </div>
  );
};
