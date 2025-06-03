import React from 'react'

export const InviteSearchInput = () => {
  return (
    <>
       {/* 검색창 */}
    <div class="invite-search">
      <input type="text" placeholder="검색" />
      <button type="submit" class="search-button">
        <svg
          class="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
    </>
  )
}
