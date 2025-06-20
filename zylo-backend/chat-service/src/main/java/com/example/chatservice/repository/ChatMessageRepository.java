package com.example.chatservice.repository;

import com.example.chatservice.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    // 특정 채널의 메시지를 시간 순으로 조회
    List<ChatMessage> findByChannelIdOrderByTimestampAsc(String channelId);

}