import React from "react";
import { InviteSearchInput } from "./InviteSearchInput";
import { InviteSearchList } from "./InviteSearchList";

export const InviteSearchBody = () => {
  return (
    <>
      {/* 사용자 검색창 */}
      <InviteSearchInput />

      {/* 사용자 검색 목록 */}
      <InviteSearchList />
    </>
  );
};
