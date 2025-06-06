import React from "react";
import "../../../styles/message/message.css";
import { MessageSidebar } from "./MessageSidebar";
import { ChatRoomMessage } from "./ChatRoomMessage";
import { ChatRoomInput } from "./ChatRoomInput";
import { useTheme } from "../../../contexts/ThemeContext";

export const Messenger = () => {
  const { toggled } = useTheme();
  return (
    <>
      {/* 메인 */}
      <main className={toggled ? "main-content dark" : "main-content"}>
        {/*채팅 목록 */}
        <MessageSidebar />

        {/* 채팅 영역 */}
        <section className="chat-room">
          <ChatRoomMessage />

          {/* 채팅 영역 입력창 */}
          <ChatRoomInput />
        </section>
      </main>
    </>
  );
};
export default Messenger;
