import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    setToggled(!toggled);
  };

  return (
    <ThemeContext.Provider value={{ toggled, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
