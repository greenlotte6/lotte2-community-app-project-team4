import React from "react";

export const InviteSearchList = ({
  users = [],
  selected = [],
  onToggleUser = () => {},
}) => {
  if (!users.length) {
    return <p className="empty">검색 결과가 없습니다.</p>;
  }

  return (
    <div className="invite-Searchlist">
      {users.map((u) => {
        const isSel = selected.some((s) => s.id === u.id);
        return (
          <div
            key={u.id}
            className={`invite-item ${isSel ? "selected" : ""}`}
            onClick={() => onToggleUser(u)}
          >
            <img
              src="/images/message/avatars.png"
              className="avatar"
              alt="User"
            />
            <div className="user-info">
              <div className="user-name">{u.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
