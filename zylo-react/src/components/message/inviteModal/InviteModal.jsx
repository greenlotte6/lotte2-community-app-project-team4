import React from "react";
import "../../styles/message/message.css";
import { InviteModalTabs } from "./inviteModalTabs";
import { InviteModalSelected } from "./inviteModalSelected";
import { InviteModalSelect } from "./InviteModalSelect";

export const InviteModal = () => {
  return (
    <div className="modal-overlay" id="inviteModal">
      <div className="invite-modal">
        {/* 헤더,  탭 */}
        <InviteModalTabs />

        {/* 본문 */}
        <div className="invite-modal-body">
          {/* 검색창 */}
          <InviteSearchInput />

          {/* 사용자 목록 & 선택된 대상 */}
          <div className="invite-lists">
            {/* 사용자 목록 */}
            <InviteModalSelect />

            {/* 화살표, 선택된 대상 */}
            <InviteModalSelected />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
