package com.example.chatservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDto {

    private String channelId;    // 채널 ID (그룹 또는 DM)
    private String sender;       // 발신자 ID 또는 닉네임
    private String receiver;     // 수신자 ID (DM 전용)
    private String content;      // 메시지 내용
    private MessageType type;    // 메시지 타입: CHAT, JOIN, LEAVE, DM

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE,
        DM
    }
}