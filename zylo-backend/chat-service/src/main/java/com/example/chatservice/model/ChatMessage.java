package com.example.chatservice.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "chat_messages")
public class ChatMessage {

    @Id
    private String id;

    private String channelId;     // 채널 또는 DM ID
    private String senderId;      // 발신자
    private String receiverId;    // 수신자 (DM 전용)
    private String content;       // 메시지 내용
    private LocalDateTime timestamp;
    private MessageType type;     // 메시지 유형: CHAT, JOIN, LEAVE, DM



    public enum MessageType {
        CHAT,   // 일반 채팅
        JOIN,   // 입장 알림
        LEAVE,  // 퇴장 알림
        DM      // 다이렉트 메시지
    }
}
