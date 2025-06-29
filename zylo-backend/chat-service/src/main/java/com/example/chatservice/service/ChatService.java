package com.example.chatservice.service;

import com.example.chatservice.dto.ChatMessageDTO;
import com.example.chatservice.model.ChatMessage;
import com.example.chatservice.repository.ChatMessageRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    //특정 채널의 모든 메시지를 시간순으로 조회
    public List<ChatMessage> findByChannelId(String channelId) {
        return chatMessageRepository.findByChannelIdOrderByTimestampAsc(channelId);
    }


    // DM 채널 메시지 저장 및 반환
    public ChatMessage saveDM(ChatMessageDTO dto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .channelId(dto.getChannelId())
                .senderId(dto.getSenderId())
                .receiverId(dto.getReceiverId())
                .content(dto.getContent())
                .timestamp(LocalDateTime.now())
                .type(ChatMessage.MessageType.CHAT)
                .build();

        return chatMessageRepository.save(chatMessage);
    }

    // 그룹 채널 메시지 저장 및 반환
    public ChatMessage saveChat(ChatMessageDTO dto) {
        ChatMessage chatMessage = ChatMessage.builder()
                .channelId(dto.getChannelId())
                .senderId(dto.getSenderId())
                .content(dto.getContent())
                .type(ChatMessage.MessageType.DM)
                .timestamp(LocalDateTime.now())
                .build();

        return chatMessageRepository.save(chatMessage);
    }




    /**
     * 채널 입장 메시지 생성 (브로드캐스트용)
     */
    public ChatMessage buildJoinMessage(ChatMessageDTO dto) {
        return ChatMessage.builder()
                .channelId(dto.getChannelId())
                .senderId(dto.getSenderId())
                .content(dto.getSenderId() + "님이 입장하셨습니다.")
                .timestamp(LocalDateTime.now())
                .type(ChatMessage.MessageType.JOIN)
                .build();
    }

    /**
     * 1:1 다이렉트 메시지 전송 처리
     * /user/{receiver}/queue/dm 으로 전송
     */
    public void sendDirectMessage(ChatMessageDTO dto) {
        ChatMessage dm = ChatMessage.builder()
                .channelId(dto.getChannelId()) // or DM ID
                .senderId(dto.getSenderId())
                .receiverId(dto.getReceiverId())
                .content(dto.getContent())
                .timestamp(LocalDateTime.now())
                .type(ChatMessage.MessageType.DM)
                .build();

        // DB 저장
        chatMessageRepository.save(dm);

        // 특정 유저에게 전송
        messagingTemplate.convertAndSendToUser(
                dto.getReceiverId(),
                "/queue/dm",
                dm
        );
    }
}