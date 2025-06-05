import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";
import { MoreMenu } from "./MoreMenu";
import { ProfileLink } from "./ProfileLink";
import { SearchBar } from "./SearchBar";

export const MessengerHeader = ({ chatroomElements }) => {
  const { toggled } = useTheme();

  return (
    <header id="content-header" className={toggled ? "dark" : "light"}>
      {chatroomElements}
      <nav>
        <ThemeToggle />
        <ProfileLink />
      </nav>
    </header>
  );
};
