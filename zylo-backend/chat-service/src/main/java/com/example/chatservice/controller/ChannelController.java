package com.example.chatservice.controller;

import com.example.chatservice.dto.CreateChannelDTO;
import com.example.chatservice.dto.UserDTO;
import com.example.chatservice.model.Channel;
import com.example.chatservice.model.User;
import com.example.chatservice.service.ChannelService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    // 즐겨찾기 된 친구 목록 조회
    @GetMapping("/friends")
    public List<String> findFriends(@RequestParam String userId) {
        List<String> friendIds = channelService.findFriends(userId);
        return friendIds;
    }


    // 내가 참여 중인 채널 목록 조회
    @GetMapping("/list")
    public List<Channel> getMyChannels(@RequestParam String userId) {
        List<Channel> channels = channelService.findUserChannels(userId);
        log.info("channels : {}", channels);
        return channels;
    }


    // 채널 생성
    @PostMapping("/create")
    public ResponseEntity<Channel> createChannel(@RequestBody CreateChannelDTO req,
                                                 @RequestHeader("X-User-Id") String ownerId) {
        Channel channel = channelService.createChannel(req, ownerId);
        return ResponseEntity.ok(channel);
    }

}