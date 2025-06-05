import React, { useEffect, useRef, useState } from "react";
import "../../../styles/message/message.css";
import { InviteModalTabs } from "./InviteModalTabs";
import { InviteModalSelected } from "./InviteModalSelected";
import { InviteModalSelect } from "./InviteModalSelect";

export const InviteModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("search");

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
    <div className="invite-overlay" id="inviteModal">
      <div className="invite-container" ref={modalRef}>
        {/* 헤더, 탭 */}
        <InviteModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="invite-body">
          <div className="invite-lists">
            <InviteModalSelect activeTab={activeTab} />
            <InviteModalSelected />
          </div>
        </div>

        {/* 푸터 */}
        <div className="invite-footer">
          <button onClick={onClose}>취소</button>
          <button>만들기</button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
