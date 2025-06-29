import React, { useRef, useEffect, useState } from "react";
import { InviteModal } from "../inviteModal/InviteModal"; // 경로 주의!

export const CreateChat = ({ onClose }) => {
  const modalRef = useRef(null);

  /* ---------- 입력 상태 ---------- */
  const [roomName, setRoomName] = useState("");
  const [inviteRule, setInviteRule] = useState(""); // '' = 미선택
  const [showInvite, setShowInvite] = useState(false); // 2단계 표시

  /* ---------- 바깥 클릭 시 모달 닫기 ---------- */
  useEffect(() => {
    const h = (e) =>
      modalRef.current && !modalRef.current.contains(e.target) && onClose();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  /* ---------- 만들기(다음) 버튼 ---------- */
  const openInvite = () => {
    if (!roomName.trim()) return alert("채팅방 이름을 입력해 주세요.");
    if (!inviteRule) return alert("멤버 초대 권한을 선택해 주세요.");
    setShowInvite(true); // 2단계로
  };

  return (
    <>
      {/* -------- 1단계: 채팅방 정보 입력 -------- */}
      {!showInvite && (
        <div className="createchat-overlay" id="createRoomModal">
          <div className="createchat-container" ref={modalRef}>
            <h2 className="createchat-title">채팅방 만들기</h2>

            <div className="createchat-body">
              <div className="createchat-form">
                <input
                  type="text"
                  placeholder="채팅방 이름"
                  value={roomName}
                  maxLength={20}
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <span className="createchat-count">{roomName.length}/20</span>
              </div>

              <div className="createchat-form">
                <select
                  value={inviteRule}
                  onChange={(e) => setInviteRule(e.target.value)}
                >
                  <option value="">멤버 초대 권한</option>
                  <option value="ALL">전체 멤버 가능</option>
                  <option value="DEPT">같은 부서만 가능</option>
                </select>
              </div>
            </div>

            <div className="createchat-footer">
              <button onClick={onClose}>취소</button>
              <button onClick={openInvite}>만들기</button>
            </div>
          </div>
        </div>
      )}

      {/* -------- 2단계: 인원 선택 모달 -------- */}
      {showInvite && (
        <InviteModal
          roomName={roomName} /* 채팅방 이름 전달 */
          inviteRule={inviteRule} /* 초대 권한 전달 */
          onClose={onClose} /* 전체 모달 닫기 */
        />
      )}
    </>
  );
};
