import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { toggled, toggle } = useTheme();

  return (
    <div className="theme">
      <span className="theme-name">Light</span>
      <div className="theme-toggle" onClick={toggle}>
        <button className={toggled ? "toggled" : ""}></button>
      </div>
      <span className="theme-name">Dark</span>
    </div>
  );
};
