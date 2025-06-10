import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/project/modal.css";
import useProjectStore from "../../store/useProjectStore";

export default function InviteMemberModal({ open, onClose, onInvite }) {
  const [name, setName] = useState("");
  const members = useProjectStore((state) => state.members);

  // 입력한 이름이 존재하는지 체크
  const foundMember = members.find((member) => member.name === name);

  if (!open) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>팀원 초대</h3>
        </div>
        <div className="project-modal-body">
          <input
            type="text"
            className="modal-input invite-name-input"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="invite-member-list">
            {name &&
              foundMember &&
              members
                .filter((member) => member.name === name)
                .map((member) => (
                  <div className={`invite-preview show`} key={member.id}>
                    <div className="invite-member">
                      <img
                        className="team-profile modal-invite-img"
                        src="/default-profile.png"
                        alt="프로필"
                      />
                      <div className="team-member-info">
                        <div className="team-member-name">{member.name}</div>
                        <div className="team-member-position">
                          {member.role}
                        </div>
                        <div className="team-member-currentStatus">온라인</div>
                      </div>
                      <button
                        className="modal-create modal-invite-btn"
                        onClick={() => {
                          onInvite(member.name);
                          setName("");
                          onClose();
                        }}
                        disabled={!name}
                      >
                        초대
                      </button>
                    </div>
                  </div>
                ))}
            {name && !foundMember && (
              <div className="invite-preview not-found">
                해당 이름의 팀원이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div className="project-modal-footer">
          <button
            className="modal-cancel"
            onClick={() => {
              setName("");
              onClose();
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
