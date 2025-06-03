import { useTheme } from "../../contexts/ThemeContext";
import { MessengerHeader } from "../message/messengerHeader/MessengerHeader";

export const MessengerContent = ({ chatroomElements, content }) => {
  const { toggled } = useTheme();

  return (
    <div id="content-area" className={toggled ? "dark" : "light"}>
      <MessengerHeader chatroomElements={chatroomElements} />
      <section id="content">{content}</section>
    </div>
  );
};
