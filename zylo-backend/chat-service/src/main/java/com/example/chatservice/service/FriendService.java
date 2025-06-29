package com.example.chatservice.service;

import com.example.chatservice.config.CustomUserDetails;
import com.example.chatservice.model.Friend;
import com.example.chatservice.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;

    public List<String> getFriends(CustomUserDetails user) {
        String userId = user.getId();

        Friend friend = friendRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("친구 정보 없음"));

        List<String> friendIds = friend.getFriends();

        return friendIds;
    }


}
