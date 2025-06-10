package com.example.chatservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // 클라이언트가 WebSocket 연결을 시도할 endpoint
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp")       // WebSocket 연결 URL
                .setAllowedOriginPatterns("*")   // 모든 도메인 허용 (CORS)
                .withSockJS();                   // SockJS fallback 활성화
    }

    // STOMP 메시지 라우팅 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트 → 서버로 메시지 보낼 때 prefix
        registry.setApplicationDestinationPrefixes("/pub");

        // 서버 → 클라이언트로 메시지 보낼 때 사용할 경로(prefix)
        registry.enableSimpleBroker("/topic", "/queue"); // topic = group, queue = 1:1 DM
        // 유저 지정 메시지를 위한 설정 (ex: /user/queue/...)
        registry.setUserDestinationPrefix("/user");
    }
}
