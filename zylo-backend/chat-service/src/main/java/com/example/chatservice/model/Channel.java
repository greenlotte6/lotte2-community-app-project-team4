package com.example.chatservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "channels")
public class Channel {

    @Id
    private String id;

    private String name;              // 채팅방 이름
    private String ownerId;           // 채널 개설자 ID
    private Set<String> members;      // 참여 중인 멤버 ID 목록
    private ChannelType type;         // GROUP or DM

    public enum ChannelType {
        GROUP,  // 다중 사용자 채널
        DM      // 1:1 다이렉트 메시지 채널
    }

    // 채널 생성 시 기본 멤버 구성
    public static Channel createGroup(String name, String ownerId) {
        Set<String> initialMembers = new HashSet<>();
        initialMembers.add(ownerId);
        return Channel.builder()
                .name(name)
                .ownerId(ownerId)
                .members(initialMembers)
                .type(ChannelType.GROUP)
                .build();
    }

    public static Channel createDM(String userA, String userB) {
        Set<String> twoUsers = new HashSet<>();
        twoUsers.add(userA);
        twoUsers.add(userB);
        return Channel.builder()
                .name(null) // DM은 이름 없음 또는 유저명 조합
                .ownerId(null)
                .members(twoUsers)
                .type(ChannelType.DM)
                .build();
    }
}
