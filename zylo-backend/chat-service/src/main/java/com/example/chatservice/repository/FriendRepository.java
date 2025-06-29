package com.example.chatservice.repository;

import com.example.chatservice.model.Friend;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FriendRepository extends MongoRepository<Friend, String> {

    List<String> findFriendsByUserId(String userId);
}
