import { useTheme } from "../../contexts/ThemeContext";
import { Header } from "./Header";

export const Content = ({ title, content }) => {
  const { toggled } = useTheme();

  return (
    <div id="content-area" className={toggled ? "dark" : "light"}>
      <Header title={title} />
      <section id="content">{content}</section>
    </div>
  );
};
