import { useTheme } from "../../contexts/ThemeContext";
import { MessengerHeader } from "../message/MessengerHeader";

export const MessengerContent = ({ title, content }) => {
  const { toggled } = useTheme();

  return (
    <div id="content-area" className={toggled ? "dark" : "light"}>
      <MessengerHeader title={title} />
      <section id="content">{content}</section>
    </div>
  );
};
