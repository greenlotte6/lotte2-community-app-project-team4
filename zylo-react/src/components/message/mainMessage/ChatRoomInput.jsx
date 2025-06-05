import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export const ChatRoomInput = () => {
  const { toggled } = useTheme();
  return (
    <>
      <div className={toggled ? "chat-room-input dark" : "chat-room-input"}>
        <div className="chat-tools">
          <FontAwesomeIcon icon={faPaperclip} />
          <FontAwesomeIcon icon={faMicrophone} />
        </div>
        <input type="text" placeholder="메세지 입력" />
        <button>전송</button>
      </div>
    </>
  );
};
