package com.example.chatservice.service;

import com.example.chatservice.dto.CreateChannelDTO;
import com.example.chatservice.model.Channel;
import com.example.chatservice.model.User;
import com.example.chatservice.repository.ChannelRepository;
import com.example.chatservice.repository.FriendRepository;
import com.example.chatservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    // 즐겨찾기 된 친구 목록 조회
    public List<String> findFriends(String userId){
        List<String> friendIds = friendRepository.findFriendsByUserId(userId);
        return friendIds;
    }

    // 그룹 채팅방 만들기
    @Transactional
    public Channel createChannel(CreateChannelDTO req, String ownerId) {

        String name        = req.getName();
        String inviteRule  = req.getInviteRule();

        List<String> memberIds = new ArrayList<>(req.getMemberIds()); // 복사
        memberIds.remove(ownerId);                                    // 방장 중복 제거

        Channel channel = Channel.createGroup(
                name,
                ownerId,
                Channel.InviteRule.valueOf(inviteRule) // 검증 필요 시 try/catch
        );

        memberIds.forEach(id -> {
            channel.getMembers().add(id);
            channel.getRoles().put(id, Channel.Role.MEMBER);
        });

        Channel saved = channelRepository.save(channel);

        joinUser(ownerId, saved.getId());
        memberIds.forEach(id -> joinUser(id, saved.getId()));

        return saved;
    }


    // 유저에게 채널 참여 기록 추가
    private void joinUser(String userId, String channelId) {
        userRepository.findById(userId).ifPresent(user -> {
            user.joinChannel(channelId);
            userRepository.save(user);
        });
    }


    // 내가 참여 중인 채널 목록 조회
    public List<Channel> findUserChannels(String userId) {
        return channelRepository.findUserChannelsIncludingOwner(userId);
    }

}