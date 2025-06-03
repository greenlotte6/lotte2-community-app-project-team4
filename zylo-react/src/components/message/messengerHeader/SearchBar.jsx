import React from "react";

export const SearchBar = ({ onClose }) => {
  return (
    <div className="search-bar">
        <input type="text" placeholder="채팅방 내 검색"autoFocus/>

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
      <button className="close-btn" onClick={onClose}>X</button>
    </div>
  );
};
