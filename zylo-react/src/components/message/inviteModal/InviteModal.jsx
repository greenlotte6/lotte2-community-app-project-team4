import React, { useEffect, useRef, useState } from "react";
import "../../../styles/message/message.css";
import { InviteModalTabs } from "./InviteModalTabs";
import { InviteModalSelected } from "./inviteModalSelected";
import { InviteModalSelect } from "./InviteModalSelect";

export const InviteModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("search"); // ⭐️ 탭 상태

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" id="inviteModal">
      <div className="invite-modal" ref={modalRef}>
        {/* 헤더, 탭 */}
        <InviteModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="invite-modal-body">
          {/* 사용자 목록 & 선택된 대상 */}
          <div className="invite-lists">
            <InviteModalSelect activeTab={activeTab} />
            <InviteModalSelected />
          </div>
        </div>
        
        {/* 푸터 */}
        <div className="modal-footer">
          <button onClick={onClose}>취소</button>
          <button>만들기</button> 
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
