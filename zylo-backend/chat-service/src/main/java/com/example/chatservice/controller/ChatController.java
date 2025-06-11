package com.example.chatservice.controller;

import com.example.chatservice.dto.ChatMessageDTO;
import com.example.chatservice.model.ChatMessage;
import com.example.chatservice.service.ChatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    // 선택된 채팅방 메세지 보기
    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getMessages(@RequestParam String channelId) {
        List<ChatMessage> chatMessages = chatService.findByChannelId(channelId);
        return ResponseEntity.ok(chatMessages);
    }


    // DM 메시지 송신 핸들러
    @MessageMapping("/sendDm")
    public void sendDMMessage(ChatMessageDTO chatMessageDTO) {
        ChatMessage chatMessage = chatService.saveDM(chatMessageDTO);
        messagingTemplate.convertAndSend("/topic/channel." + chatMessageDTO.getChannelId(), chatMessage);
    }


    // Chat 메시지 송신 핸들러
    @MessageMapping("/sendChat")
    public ChatMessage sendChatMessage(ChatMessageDTO chatMessageDTO) {
        ChatMessage chatMessage = chatService.saveChat(chatMessageDTO);
        messagingTemplate.convertAndSend("/topic/channel." + chatMessageDTO.getChannelId(), chatMessage);
        return chatMessage;
    }



    // 채팅방 입장 시 사용자 정보 저장 (옵션)
    @MessageMapping("/addUser")
    @SendTo("/topic/channel.{channelId}")
    public ChatMessage addUser(ChatMessageDTO chatMessageDTO, SimpMessageHeaderAccessor headerAccessor) {
        // 세션에 사용자 정보 저장 (선택)
        headerAccessor.getSessionAttributes().put("username", chatMessageDTO.getSenderId());
        return chatService.buildJoinMessage(chatMessageDTO);
    }

}
