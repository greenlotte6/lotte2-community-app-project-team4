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
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;
    private String username;
    private String dept;
    private Role role; // FREE or PLUS

    // 사용자가 참여 중인 채널 ID 목록 (옵션)
    private Set<String> joinedChannelIds;

    public enum Role {
        FREE,
        PLUS
    }

    public boolean isBasic() {
        return this.role == Role.FREE;
    }

    public boolean isPremium() {
        return this.role == Role.PLUS;
    }

    public void joinChannel(String channelId) {
        if (joinedChannelIds == null) {
            joinedChannelIds = new HashSet<>();
        }
        joinedChannelIds.add(channelId);
    }

    public void leaveChannel(String channelId) {
        if (joinedChannelIds != null) {
            joinedChannelIds.remove(channelId);
        }
    }
}