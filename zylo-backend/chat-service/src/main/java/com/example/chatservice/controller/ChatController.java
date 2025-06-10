package com.example.chatservice.controller;


import com.example.chatservice.dto.ChatMessageDto;
import com.example.chatservice.model.ChatMessage;
import com.example.chatservice.service.ChatService;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    /**
     * 그룹 채팅 메시지 송신 핸들러
     * 클라이언트는 /pub/chat.sendMessage 로 메시지를 보낸다
     */
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/channel.{channelId}")
    public ChatMessage sendMessage(ChatMessageDto chatMessageDto) {
        // 메시지 저장
        return chatService.save(chatMessageDto);
    }

    /**
     * 채팅방 입장 시 사용자 정보 저장 (옵션)
     */
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/channel.{channelId}")
    public ChatMessage addUser(ChatMessageDto chatMessageDto, SimpMessageHeaderAccessor headerAccessor) {
        // 세션에 사용자 정보 저장 (선택)
        headerAccessor.getSessionAttributes().put("username", chatMessageDto.getSender());
        return chatService.buildJoinMessage(chatMessageDto);
    }

    /**
     * DM 메시지 송신 - 특정 유저에게만 보냄
     * /user/{username}/queue/dm 으로 전송됨
     */
    @MessageMapping("/chat.sendDm")
    public void sendDirectMessage(ChatMessageDto chatMessageDto) {
        chatService.sendDirectMessage(chatMessageDto);
    }
}
