import React from "react";
import { InviteSearchBody } from "./inviteSearch/InviteSearchBody";
import { InviteMarksBody } from "./inviteMarks/InviteMarksBody";
import { InviteDepartBody } from "./inviteDepart/InviteDepartBody";

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

    {activeTab === "org" && (
      <InviteDepartBody
        users={users}
        selected={selected}
        onToggleUser={onToggleUser}
      />
    )}

    {activeTab === "favorites" && (
      <InviteMarksBody
        users={users}
        selected={selected}
        onToggleUser={onToggleUser}
      />
    )}
  </div>
);
