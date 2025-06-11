import React from "react";

export const InviteSearchInput = () => (
  <div className="invite-search">
    {/* 검색창 */}
    <input type="text" placeholder="검색" />

    {/* 돋보기 버튼 */}
    <button type="submit" className="search-button" aria-label="검색">
      <svg
        className="search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ccc"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </button>
  </div>
);
