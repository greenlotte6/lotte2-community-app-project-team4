package com.example.chatservice.service;

import com.example.chatservice.dto.ChatMessageDto;
import com.example.chatservice.model.ChatMessage;
import com.example.chatservice.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * 일반 채널 메시지 저장 및 반환
     */
    public ChatMessage save(ChatMessageDto dto) {
        ChatMessage message = ChatMessage.builder()
                .channelId(dto.getChannelId())
                .senderId(dto.getSender())
                .content(dto.getContent())
                .timestamp(LocalDateTime.now())
                .type(ChatMessage.MessageType.CHAT)
                .build();

        return chatMessageRepository.save(message);
    }

    /**
     * 채널 입장 메시지 생성 (브로드캐스트용)
     */
    public ChatMessage buildJoinMessage(ChatMessageDto dto) {
        return ChatMessage.builder()
                .channelId(dto.getChannelId())
                .senderId(dto.getSender())
                .content(dto.getSender() + "님이 입장하셨습니다.")
                .timestamp(LocalDateTime.now())
                .type(ChatMessage.MessageType.JOIN)
                .build();
    }

    /**
     * 1:1 다이렉트 메시지 전송 처리
     * /user/{receiver}/queue/dm 으로 전송
     */
    public void sendDirectMessage(ChatMessageDto dto) {
        ChatMessage dm = ChatMessage.builder()
                .channelId(dto.getChannelId()) // or DM ID
                .senderId(dto.getSender())
                .receiverId(dto.getReceiver())
                .content(dto.getContent())
                .timestamp(LocalDateTime.now())
                .type(ChatMessage.MessageType.DM)
                .build();

        // DB 저장
        chatMessageRepository.save(dm);

        // 특정 유저에게 전송
        messagingTemplate.convertAndSendToUser(
                dto.getReceiver(),
                "/queue/dm",
                dm
        );
    }
}