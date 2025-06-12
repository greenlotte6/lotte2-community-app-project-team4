import React, { useRef, useState, useEffect } from "react"; // useEffect 임포트 추가
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
  const [allUsers, setAllUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      setUsersError(null);
      try {
        const response = await axios.get("http://localhost:8082/v1/user/all", {
          headers: { "X-User-Id": "user123" },
        });
        if (response.data && Array.isArray(response.data)) {
          console.log(response.data);
          setAllUsers(response.data);
        }
      } catch (err) {
        console.error("사용자 목록 가져오기 오류:", err);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUser = (u) =>
    setSelected((prev) =>
      prev.some((x) => x.id === u.id)
        ? prev.filter((x) => x.id !== u.id)
        : [...prev, u]
    );
  const usersToShow = allUsers;

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
        console.log("채널 생성 응답:", response);

        if (response && response.data) {
          alert("채팅방이 생성되었습니다!");
          window.location.reload();
        } else {
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

  if (usersLoading) {
    return (
      <div className="invite-overlay">
        <div className="invite-container">
          <p>사용자 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (usersError) {
    return (
      <div className="invite-overlay">
        <div className="invite-container">
          <p className="error-message">{usersError}</p>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="invite-overlay" id="inviteModal">
      <div className="invite-container" ref={modalRef}>
        <InviteModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="invite-body">
          <div className="invite-lists">
            <InviteModalSelect
              users={usersToShow}
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
