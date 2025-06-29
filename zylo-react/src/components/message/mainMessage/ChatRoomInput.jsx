import React, { useState, useCallback } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export const ChatRoomInput = ({ selectedChannel, stompClient, senderId }) => {
  const { toggled } = useTheme();
  const [input, setInput] = useState("");

  // DM 상대 찾기
  const getDMReceiverId = (members, sender) =>
    members.find((id) => id !== sender);

  // 메시지 전송
  const sendMessage = useCallback(() => {
    if (!input.trim() || !selectedChannel) {
      console.warn("[ChatRoomInput] 입력값 또는 채널 없음, 전송 취소");
      return;
    }

    const isDM = selectedChannel.type === "DM";

    const message = {
      channelId: selectedChannel.id,
      senderId,
      content: input,
      type: isDM ? "DM" : "CHAT",
      ...(isDM && {
        receiverId: getDMReceiverId(selectedChannel.members, senderId),
      }),
    };

    const destination = isDM ? "/pub/sendDm" : "/pub/sendChat";

    console.log("[ChatRoomInput] publish →", destination, message);

    if (stompClient.current?.connected) {
      stompClient.current.publish({
        destination,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(message),
      });
    } else {
      console.error("[ChatRoomInput] STOMP 미연결, publish 실패");
    }

    setInput("");
  }, [input, selectedChannel, stompClient, senderId]);

  return (
    <div className={toggled ? "chat-room-input dark" : "chat-room-input"}>
      <div className="chat-tools">
        <FontAwesomeIcon icon={faPaperclip} />
        <FontAwesomeIcon icon={faMicrophone} />
      </div>

      <input
        type="text"
        placeholder="메세지 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button
        onClick={sendMessage}
        disabled={!stompClient?.connected || !input.trim()}
      >
        전송
      </button>
    </div>
  );
};
