import React from "react";
import { InviteDepartList } from "./InviteDepartList";
import { InviteDepartMembers } from "./InviteDepartMembers";

export const InviteDepartBody = () => {
  return (
    <>
      {/* 부서 목록 */}
      <InviteDepartList />

      {/* 사용자 목록 */}
      <InviteDepartMembers />
    </>
  );
};
