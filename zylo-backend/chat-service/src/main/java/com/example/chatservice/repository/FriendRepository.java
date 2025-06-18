package com.example.chatservice.repository;

import com.example.chatservice.model.Friend;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FriendRepository extends MongoRepository<Friend, String> {
}
