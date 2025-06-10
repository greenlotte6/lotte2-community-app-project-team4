package com.example.chatservice.controller;

import com.example.chatservice.model.Channel;
import com.example.chatservice.service.ChannelService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    /**
     * 채널 생성
     */
    @PostMapping("/create")
    public ResponseEntity<Channel> createChannel(@RequestParam String name,
                                                 @RequestParam String ownerId) {
        Channel created = channelService.createGroupChannel(name, ownerId);
        return ResponseEntity.ok(created);
    }

    /**
     * 멤버 추가
     */
    @PostMapping("/{channelId}/add")
    public ResponseEntity<String> addMember(@PathVariable String channelId,
                                            @RequestParam String targetUserId,
                                            @RequestParam String requesterId) {
        channelService.addMember(channelId, targetUserId, requesterId);
        return ResponseEntity.ok("멤버가 추가되었습니다.");
    }

    /**
     * 채널 나가기
     */
    @PostMapping("/{channelId}/leave")
    public ResponseEntity<String> leaveChannel(@PathVariable String channelId,
                                               @RequestParam String userId) {
        channelService.leaveChannel(channelId, userId);
        return ResponseEntity.ok("채널을 나갔습니다.");
    }

    /**
     * 개설자 권한 이임
     */
    @PostMapping("/{channelId}/transfer")
    public ResponseEntity<String> transferOwnership(@PathVariable String channelId,
                                                    @RequestParam String newOwnerId,
                                                    @RequestParam String currentOwnerId) {
        channelService.transferOwnership(channelId, newOwnerId, currentOwnerId);
        return ResponseEntity.ok("채널 권한을 이임했습니다.");
    }

    /**
     * 내가 참여 중인 채널 목록 조회
     */
    @GetMapping("/my")
    public List<Channel> getMyChannels(@RequestParam String userId) {
        return channelService.findUserChannels(userId);
    }
}