import React from "react";
import { InviteSearchBody } from "./inviteSearch/InviteSearchBody";
import { InviteMarksBody } from "./inviteMarks/InviteMarksBody";

export const InviteModalSelect = ({
  activeTab,
  users = [],
  selected = [],
  onToggleUser,
}) => (
  <div className="invite-select">
    {activeTab === "search" && (
      <InviteSearchBody
        users={users}
        selected={selected}
        onToggleUser={onToggleUser}
      />
    )}

    {activeTab === "marks" && (
      <InviteMarksBody
        users={users}
        selected={selected}
        onToggleUser={onToggleUser}
      />
    )}
  </div>
);
