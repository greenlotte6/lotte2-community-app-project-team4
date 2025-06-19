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
  const stompClient = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);
  const { toggled } = useTheme();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const subscriptionRef = useRef(null);
  const [messages, setMessages] = useState([]);

  // WebSocket 연결
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP]", str),
    });

    client.onConnect = () => {
      console.log("STOMP CONNECTED");
      setIsConnected(true);
    };

    client.onStompError = (f) =>
      console.error("STOMP 오류:", f.headers.message, f.body);

    client.activate();
    stompClient.current = client;

    return () => client.deactivate();
  }, []);

  // 로그인 한 사용자 정보 가져오기
  useEffect(() => {
    axios
      .get("http://localhost:8082/v1/user", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setUserId(response.data.id);
        }
      });
  }, []);

  // 채널 목록 가져오기
  useEffect(() => {
    if (!userId) return;
    console.log("userId: ", userId);
    axios
      .get("http://localhost:8080/channel/list", {
        params: { userId },
      })
      .then(({ data }) => {
        console.log("받아온 채널 목록: ", data);
        setChannels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("채널 목록 실패:", err);
        setLoading(false);
      });
  }, [userId]);

  // 선택 채널 변경 시
  useEffect(() => {
    if (!selectedChannel || !isConnected || !stompClient?.current) return;

    // 과거 메시지
    axios
      .get("http://localhost:8080/chat/messages", {
        params: { channelId: selectedChannel.id },
      })
      .then(({ data }) => setMessages(data))
      .catch((err) => console.error("메시지 불러오기 실패:", err));

    // 기존 구독 해제
    subscriptionRef.current?.unsubscribe();

    // 새 구독
    const topic = `/topic/channel.${selectedChannel.id}`;
    subscriptionRef.current = stompClient.current.subscribe(topic, (frame) => {
      const newMsg = JSON.parse(frame.body);
      setMessages((prev) => [...prev, newMsg]);
    });

    // cleanup
    return () => subscriptionRef.current?.unsubscribe();
  }, [selectedChannel, isConnected, stompClient]);

  // 초기 선택 채널 처리
  useEffect(() => {
    const storedChannelId = localStorage.getItem("selectedChannelId");
    if (storedChannelId && channels.length > 0) {
      const channel = channels.find((ch) => ch.id === storedChannelId);
      if (channel) setSelectedChannel(channel);
    } else if (channels.length > 0) {
      setSelectedChannel(channels[0]);
    }
  }, [channels]);

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
    localStorage.setItem("selectedChannelId", channel.id);
  };

  // JSX 렌더링
  return (
    <main className={toggled ? "main-content dark" : "main-content"}>
      {loading ? (
        <div className="loading">채널 목록을 불러오는 중...</div>
      ) : (
        <>
          <MessageSidebar
            channels={channels}
            selectedChannel={selectedChannel}
            onSelectChannel={handleChannelClick}
          />
          <section className="chat-room">
            <ChatRoomMessage
              selectedChannel={selectedChannel}
              messages={messages}
              stompClient={stompClient}
              senderId={userId}
            />
            <ChatRoomInput
              selectedChannel={selectedChannel}
              stompClient={stompClient}
              senderId={userId}
            />
          </section>
        </>
      )}
    </main>
  );
};

export default Messenger;
