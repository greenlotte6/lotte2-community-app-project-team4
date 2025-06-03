import React, { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";
import { MoreMenu } from "./MoreMenu";
import { ProfileLink } from "./ProfileLink";
import { SearchBar } from "./SearchBar";

export const MessengerHeader = ({ chatroomElements }) => {
  const { toggled } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 🔵 상태 추가

  return (
    <header id="content-header" className={toggled ? "dark" : "light"}>
      {chatroomElements}
      <nav>
        <ThemeToggle />
        {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />} {/* 🔵 검색창 조건부 렌더 */}
        <MoreMenu onOpenSearch={() => setIsSearchOpen(true)} /> {/* 🔵 props로 전달 */}
        <ProfileLink />
      </nav>
    </header>
  );
};
