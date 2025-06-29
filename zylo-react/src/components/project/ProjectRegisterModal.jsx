import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/project/modal.css";
import { postCreate } from "../../api/projectAPI";
import useProjectStore from "../../store/useProjectStore";

export const ProjectRegisterModal = ({ modal, setModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const addProject = useProjectStore((state) => state.addProject);

  const handleCreate = async () => {
    try {
      const payload = {
        name,
        description,
        startDate,
        endDate,
      };
      console.log("보내는 데이터:", payload);

      await postCreate(payload);
      console.log(payload);
      // 로컬 스토리지 추가
      addProject(payload);
      setModal(false);
      alert("프로젝트가 생성되었습니다.");
    } catch (err) {
      console.log(err);
      alert("등록에 실패했습니다.");
    }
  };

  if (!modal) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>프로젝트 제목</h3>
          <input
            type="text"
            className="modal-input"
            placeholder="제목"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="project-modal-body">
          <h4>설명</h4>
          <textarea
            className="modal-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="modal-date-fields">
            <label>
              시작일&nbsp;
              <input
                type="date"
                className="modal-date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label style={{ marginLeft: "16px" }}>
              종료일&nbsp;
              <input
                type="date"
                className="modal-date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="project-modal-footer">
          <button className="modal-cancel" onClick={() => setModal(false)}>
            취소
          </button>
          <button className="modal-create" onClick={handleCreate}>
            생성
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
