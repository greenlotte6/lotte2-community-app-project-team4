package com.example.chatservice.service;

import com.example.chatservice.model.Channel;
import com.example.chatservice.model.User;
import com.example.chatservice.repository.ChannelRepository;
import com.example.chatservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    /**
     * 새로운 그룹 채널 생성
     */
    public Channel createGroupChannel(String name, String ownerId) {
        Channel channel = Channel.createGroup(name, ownerId);
        Channel saved = channelRepository.save(channel);

        // owner 유저에도 참여 기록 추가
        userRepository.findById(ownerId).ifPresent(user -> {
            user.joinChannel(saved.getId());
            userRepository.save(user);
        });

        return saved;
    }

    /**
     * 채널에 멤버 추가 (등급 제한 적용)
     */
    public void addMember(String channelId, String targetUserId, String requesterId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NoSuchElementException("채널이 존재하지 않습니다."));
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new NoSuchElementException("요청자가 존재하지 않습니다."));
        User targetUser = userRepository.findById(targetUserId)
                .orElseThrow(() -> new NoSuchElementException("추가 대상 사용자가 존재하지 않습니다."));

        if (channel.getType() == Channel.ChannelType.DM) {
            throw new IllegalStateException("DM 채널에는 멤버를 추가할 수 없습니다.");
        }

        if (requester.isBasic() && channel.getMembers().size() >= 3) {
            throw new AccessDeniedException("기본 회원은 최대 3명까지만 멤버를 추가할 수 있습니다.");
        }

        // 이미 참여 중인지 확인
        if (channel.getMembers().contains(targetUserId)) {
            return;
        }

        // 채널에 추가
        channel.getMembers().add(targetUserId);
        channelRepository.save(channel);

        // 사용자에도 채널 참여 기록 추가
        targetUser.joinChannel(channelId);
        userRepository.save(targetUser);
    }

    /**
     * 채널 나가기 - 개설자는 위임 필요
     */
    public void leaveChannel(String channelId, String userId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NoSuchElementException("채널이 존재하지 않습니다."));

        if (!channel.getMembers().contains(userId)) {
            throw new IllegalStateException("이미 채널을 나간 사용자입니다.");
        }

        if (userId.equals(channel.getOwnerId())) {
            if (channel.getMembers().size() <= 1) {
                // 마지막 사용자면 삭제
                channelRepository.delete(channel);
                return;
            } else {
                throw new IllegalStateException("개설자는 권한을 위임한 후 나갈 수 있습니다.");
            }
        }

        // 나가기 처리
        channel.getMembers().remove(userId);
        channelRepository.save(channel);

        // 사용자 참여 목록에서도 제거
        userRepository.findById(userId).ifPresent(user -> {
            user.leaveChannel(channelId);
            userRepository.save(user);
        });
    }

    /**
     * 채널 개설자 권한 위임
     */
    public void transferOwnership(String channelId, String newOwnerId, String currentOwnerId) {
        Channel channel = channelRepository.findById(channelId)
                .orElseThrow(() -> new NoSuchElementException("채널이 존재하지 않습니다."));

        if (!channel.getOwnerId().equals(currentOwnerId)) {
            throw new AccessDeniedException("권한이 없습니다. 개설자만 이임할 수 있습니다.");
        }

        if (!channel.getMembers().contains(newOwnerId)) {
            throw new IllegalStateException("새 소유자는 채널 멤버여야 합니다.");
        }

        channel.setOwnerId(newOwnerId);
        channelRepository.save(channel);
    }

    /**
     * 채널 목록 조회 (참여 중인 것만)
     */
    public List<Channel> findUserChannels(String userId) {
        return channelRepository.findByMembersContaining(userId);
    }
}