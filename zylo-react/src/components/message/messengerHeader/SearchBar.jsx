import React from "react";

export const SearchBar = ({ onClose }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input type="text" placeholder="채팅방 내 검색" autoFocus />
        <button type="submit" className="search-button">
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
      <button className="search-close-btn" onClick={onClose}>닫기</button>
    </div>
  );
};
