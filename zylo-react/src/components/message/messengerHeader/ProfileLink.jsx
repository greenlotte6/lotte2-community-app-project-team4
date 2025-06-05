import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { MoreMenu } from "./MoreMenu";
import { SearchBar } from "./SearchBar";

export const ProfileLink = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 🔵 상태 추가
  return (
    <div className="nav">
      <div className="toolbar">
        {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}{" "}
        {/* 🔵 검색창 조건부 렌더 */}
        <MoreMenu onOpenSearch={() => setIsSearchOpen(true)} />{" "}
        {/* 🔵 props로 전달 */}
        <Link to="">
          <FontAwesomeIcon icon={faShareFromSquare} />
        </Link>
      </div>
      <Link to="https://naver.com">
        <div className="profile">
          <img src="/images/profile_sample.jpg" alt="" />
          <div>
            <h3 className="profile-name">홍길동</h3>
            <span className="profile-email">hgd313@example.com</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
