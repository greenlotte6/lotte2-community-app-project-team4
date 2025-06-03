import React from "react";
import { InviteSearchBody } from "./inviteSearch/InviteSearchBody";
import { InviteMarksBody } from "./inviteMarks/InviteMarksBody";
import { InviteDepartBody } from "./inviteDepart/InviteDepartBody";

export const InviteModalSelect = ({ activeTab }) => {
  return (
    <div className="invite-select">
      {activeTab === "search" && <InviteSearchBody />}
      {activeTab === "org" && <InviteDepartBody />}
      {activeTab === "favorites" && <InviteMarksBody />}
    </div>
  );
};
