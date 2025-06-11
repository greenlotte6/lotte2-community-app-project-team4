/* 예: InviteSearchBody.jsx */
import React from "react";
import { InviteSearchInput } from "./InviteSearchInput";
import { InviteSearchList } from "./InviteSearchList";

export const InviteSearchBody = ({ users, selected, onToggleUser }) => (
  <>
    <InviteSearchInput />
    <InviteSearchList
      users={users}
      selected={selected}
      onToggleUser={onToggleUser}
    />
  </>
);
