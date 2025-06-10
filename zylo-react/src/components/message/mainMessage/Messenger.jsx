// src/components/message/mainMessage/Messenger.js
import React, { useEffect, useRef } from "react";
import "../../../styles/message/message.css";
import { MessageSidebar } from "./MessageSidebar";
import { ChatRoomMessage } from "./ChatRoomMessage";
import { ChatRoomInput } from "./ChatRoomInput";
import { useTheme } from "../../../contexts/ThemeContext";

// STOMP 및 SockJS 라이브러리 임포트
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export const Messenger = () => {
  const { toggled } = useTheme();

  // STOMP 클라이언트 인스턴스를 저장하기 위한 ref
  const stompClient = useRef(null);

  useEffect(() => {
    console.log("WebSocket 연결을 시도합니다.");

    // 1. SockJS 연결 설정
    // 이 주소는 Spring Boot 서버의 WebSocket 설정과 정확히 일치해야 합니다.
    // 예를 들어, Spring Boot에서 registry.addEndpoint("/ws").withSockJS(); 로 설정했다면 동일하게 사용합니다.
    const socket = new SockJS("http://localhost:8080/ws"); // **여기를 실제 Spring Boot 서버 주소로 변경하세요!**
    stompClient.current = Stomp.over(socket);

    // STOMP 디버그 메시지를 보고 싶지 않다면 아래 주석을 해제하세요.
    // stompClient.current.debug = null;

    // 2. STOMP 연결 시도
    stompClient.current.connect(
      {},
      (frame) => {
        // 연결 성공 시 실행되는 콜백 함수
        console.log("WebSocket에 성공적으로 연결되었습니다:", frame);

        // 여기에 메시지 구독 로직을 추가할 수 있습니다.
        // 예: stompClient.current.subscribe('/topic/public', (message) => { /* 메시지 처리 */ });
      },
      (error) => {
        // 연결 실패 시 실행되는 콜백 함수
        console.error("WebSocket 연결 에러:", error);
        // 에러 처리 로직을 여기에 추가할 수 있습니다.
      }
    );

    // 3. 컴포넌트 언마운트 시 연결 해제 (cleanup)
    return () => {
      console.log("WebSocket 연결을 해제합니다.");
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log("WebSocket 연결이 해제되었습니다.");
        });
      }
    };
  }, []); // 빈 배열: 컴포넌트가 마운트될 때 한 번만 실행하고, 언마운트 시 클린업합니다.

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
