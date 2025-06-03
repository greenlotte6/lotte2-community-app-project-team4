import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { CreateChat } from "../chatAction/CreateChat";
import InviteModal from "../inviteModal/InviteModal";
import { LeaveChat } from "../chatAction/LeaveChat"; 

export const MoreMenu = ({ onOpenSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLeaveChatModalOpen, setIsLeaveChatModalOpen] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
        setIsCreateModalOpen(false);
        setIsInviteModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMakeChat = () => {
    setIsCreateModalOpen(false);
    setIsInviteModalOpen(true);
  };

  return (
    <div className="more-menu-wrapper" ref={modalRef}>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>
        <FontAwesomeIcon className="more" icon={faEllipsis} />
      </button>

      {isModalOpen && (
        <div className="more-menu-modal">
          <p
            onClick={() => {
              setIsCreateModalOpen(true);
              setIsModalOpen(false);
            }}
          >
            채팅방 만들기
          </p>
          <p
            onClick={() => {
              setIsLeaveChatModalOpen(true);
              setIsModalOpen(false);
            }}
          >
            채팅방 나가기
          </p>
          <p
            onClick={() => {
              onOpenSearch(); 
              setIsModalOpen(false);
            }}
          >
            통합 검색
          </p>
        </div>
      )}

      {/* 채팅방 만들기 모달 */}
      {isCreateModalOpen && (
        <CreateChat
          onClose={() => setIsCreateModalOpen(false)}
          onMakeChat={handleMakeChat}
        />
      )}

      {/* InviteModal */}
      {isInviteModalOpen && (
        <InviteModal onClose={() => setIsInviteModalOpen(false)} />
      )}

      {/* LeaveChat 모달 */}
      {isLeaveChatModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsLeaveChatModalOpen(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 방지
          >
            <LeaveChat
              onClose={() => setIsLeaveChatModalOpen(false)}
              onLeave={() => setIsLeaveChatModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
