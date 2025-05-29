import { useTheme } from "../../contexts/ThemeContext";

export const SearchBox = () => {
  const { toggled } = useTheme();
  return (
    <input
      type="text"
      id="search-box"
      placeholder="검색어를 입력하세요"
      className={toggled ? "dark" : "light"}
    />
  );
};
