import React, { useEffect, useRef, useState } from "react";
import "../../../styles/message/message.css";
import { MessageSidebar } from "./MessageSidebar";
import { ChatRoomMessage } from "./ChatRoomMessage";
import { ChatRoomInput } from "./ChatRoomInput";
import { useTheme } from "../../../contexts/ThemeContext";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";

export const Messenger = () => {
  const { toggled } = useTheme();

  // -------- 상태 --------
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false); // 🔹 STOMP 연결 여부

  // -------- STOMP --------
  const stompClient = useRef(null);
  const subscriptionRef = useRef(null); // 현재 구독 저장

  /* ------------------ 1. WebSocket 연결 ------------------ */
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("https://api.greenlotteon.com/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP]", str),
    });

    client.onConnect = () => {
      console.log("✅ STOMP CONNECTED");
      setIsConnected(true);
    };

    client.onStompError = (f) =>
      console.error("STOMP 오류:", f.headers.message, f.body);

    client.activate();
    stompClient.current = client;

    return () => client.deactivate();
  }, []);

  /* ------------------ 2. 채널 목록 ------------------ */
  useEffect(() => {
    axios
      .get("/api/channel/list", { params: { userId: "user123" } })
      .then(({ data }) => {
        setChannels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("채널 목록 실패:", err);
        setLoading(false);
      });
  }, []);

  /* ------------------ 3. 선택 채널 변경 시 ------------------ */
  useEffect(() => {
    if (!selectedChannel || !isConnected) return;

    // ① 과거 메시지
    axios
      .get("/api/chat/messages", {
        params: { channelId: selectedChannel.id },
      })
      .then(({ data }) => setMessages(data))
      .catch((err) => console.error("메시지 불러오기 실패:", err));

    // ② 기존 구독 해제
    subscriptionRef.current?.unsubscribe();

    // ③ 새 구독
    const topic = `/topic/channel.${selectedChannel.id}`;
    subscriptionRef.current = stompClient.current.subscribe(topic, (frame) => {
      const newMsg = JSON.parse(frame.body);
      setMessages((prev) => [...prev, newMsg]); // 실시간 추가
    });

    // ④ cleanup
    return () => subscriptionRef.current?.unsubscribe();
  }, [selectedChannel, isConnected]);

  /* ------------------ 로딩 스피너 ------------------ */
  if (loading) {
    return <div className="loading">채널 목록을 불러오는 중...</div>;
  }

  /* ------------------ UI ------------------ */
  return (
    <>
      <main className={toggled ? "main-content dark" : "main-content"}>
        {/* 채널 목록 */}
        <MessageSidebar
          channels={channels}
          selectedChannel={selectedChannel}
          onSelectChannel={setSelectedChannel}
        />

        {/* 채팅 영역 */}
        <section className="chat-room">
          <ChatRoomMessage
            messages={messages}
            selectedChannel={selectedChannel}
          />
          <ChatRoomInput
            selectedChannel={selectedChannel}
            stompClient={stompClient.current}
          />
        </section>
      </main>
    </>
  );
};

export default Messenger;
