import React, { useRef, useState } from "react";
import "../../../styles/message/message.css";
import { InviteModalTabs } from "./InviteModalTabs";
import { InviteModalSelected } from "./InviteModalSelected";
import { InviteModalSelect } from "./InviteModalSelect";
import axios from "axios";

export const InviteModal = ({ onClose, roomName, inviteRule }) => {
  const modalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("search");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleUser = (u) =>
    setSelected((prev) =>
      prev.some((x) => x.id === u.id)
        ? prev.filter((x) => x.id !== u.id)
        : [...prev, u]
    );

  const dummyUsers = [...Array(10)].map((_, i) => ({
    id: i,
    name: `홍길동 ${i}`,
    position: "두부씨 팀장",
  }));

  const createChannel = () => {
    setLoading(true);

    axios
      .post(
        "/api/channel/create",
        {
          name: roomName,
          inviteRule,
          memberIds: selected.map((u) => u.id),
        },
        { headers: { "X-User-Id": "user123" } }
      )
      .then((response) => {
        // 1. 콘솔에 response 전체를 찍어 봅니다.
        console.log("채널 생성 응답:", response);

        // 2. 정상 데이터가 있는지 확인
        if (response && response.data) {
          alert("채팅방이 생성되었습니다!");
          // 페이지 리로드 또는 목록 재조회 로직
          window.location.reload();
        } else {
          // data가 없다면 오류 처리
          console.error("응답 데이터가 없습니다:", response);
          alert("채팅방 생성 실패: 응답 데이터 없음");
        }
      })
      .catch((err) => {
        console.error("채널 생성 요청 오류:", err);
        alert("채팅방 생성 실패");
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  };

  return (
    <div className="invite-overlay" id="inviteModal">
      <div className="invite-container" ref={modalRef}>
        <InviteModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="invite-body">
          <div className="invite-lists">
            <InviteModalSelect
              users={dummyUsers}
              activeTab={activeTab}
              selected={selected}
              onToggleUser={toggleUser}
            />
            <InviteModalSelected
              selected={selected}
              onRemoveUser={toggleUser}
            />
          </div>
        </div>

        <div className="invite-footer">
          <button onClick={onClose} disabled={loading}>
            취소
          </button>
          <button
            onClick={createChannel}
            disabled={loading || !selected.length}
          >
            {loading ? "생성 중..." : "만들기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
