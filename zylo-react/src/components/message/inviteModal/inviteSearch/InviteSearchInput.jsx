import React from 'react'

export const InviteSearchInput = () => {
  return (
    <>
       {/* 검색창 */}
        <div className="invite-search">
            <input type="text" placeholder="사용자 검색" />
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
        </div> 
    </>
  )
}
