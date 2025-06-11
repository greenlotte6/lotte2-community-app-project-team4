import React from "react";

export const InviteModalSelected = ({ selected, onRemoveUser }) => (
  <>
    <div className="arrow-divider">{/* 화살표 SVG… */}</div>

    <div className="invite-selected">
      {selected.map((u) => (
        <div className="invite-item" key={u.id}>
          <img
            src="/images/message/avatars.png"
            className="avatar"
            alt="User"
          />
          <div className="user-info">
            <div className="user-name">{u.position}</div>
            <div className="user-detail">{u.name}</div>
          </div>
          <button className="remove-btn" onClick={() => onRemoveUser(u)}>
            &times;
          </button>
        </div>
      ))}
      {!selected.length && <p className="empty">선택된 대상이 없습니다.</p>}
    </div>
  </>
);
