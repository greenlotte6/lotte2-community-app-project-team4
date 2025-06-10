import React from "react";
import { createPortal } from "react-dom";
import "../../styles/project/modal.css";

export const ProjectRegisterModal = ({ modal, setModal }) => {
  if (!modal) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>프로젝트 제목</h3>
          <input type="text" className="modal-input" placeholder="제목" />
        </div>
        <div className="project-modal-body">
          <h4>설명</h4>
          <textarea className="modal-textarea"></textarea>
          <div className="modal-date-fields">
            <label>
              시작일&nbsp;
              <input type="date" className="modal-date-input" />
            </label>
            <label style={{ marginLeft: "16px" }}>
              종료일&nbsp;
              <input type="date" className="modal-date-input" />
            </label>
          </div>
        </div>
        <div className="project-modal-footer">
          <button className="modal-cancel" onClick={() => setModal(false)}>
            Cancel
          </button>
          <button className="modal-create">Create</button>
        </div>
      </div>
    </div>,
    document.body
  );
};
