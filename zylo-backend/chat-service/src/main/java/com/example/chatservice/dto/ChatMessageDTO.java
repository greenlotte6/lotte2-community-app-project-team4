package com.example.chatservice.dto;

import com.example.chatservice.model.ChatMessage;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {

    private String channelId;     // 채널 또는 DM ID
    private String senderId;      // 발신자
    private String receiverId;    // 수신자 (DM 전용)
    private String content;       // 메시지 내용
    private LocalDateTime timestamp;
    private MessageType type;     // 메시지 유형: CHAT, JOIN, LEAVE, DM

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        DM
    }
}