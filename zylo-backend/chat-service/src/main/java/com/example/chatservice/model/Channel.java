package com.example.chatservice.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "channels")
public class Channel {

    @Id
    private String id;
    private String name;
    private String ownerId;
    private Set<String> members;
    private ChannelType type;
    private InviteRule inviteRule;

    @CreatedDate
    @Indexed(name = "idx_created_at")
    private LocalDateTime createdAt;


    /** 🔹 멤버별 권한: userId → Role */
    private Map<String, Role> roles;

    public enum ChannelType { GROUP, DM }
    public enum InviteRule  { ALL, DEPT, FRIEND }
    public enum Role        { ADMIN, MEMBER }

    /* 그룹 채널 */
    public static Channel createGroup(String name, String ownerId, InviteRule rule) {
        Set<String> members = new HashSet<>(Set.of(ownerId));
        Map<String, Role> roles = new HashMap<>();
        roles.put(ownerId, Role.ADMIN);            // 방장 권한 부여

        return Channel.builder()
                .name(name)
                .ownerId(ownerId)
                .members(members)
                .roles(roles)
                .type(ChannelType.GROUP)
                .inviteRule(rule)
                .build();
    }

    /* DM 채널 */
    public static Channel createDM(String userA, String userB) {
        Set<String> members = new HashSet<>(Set.of(userA, userB));

        return Channel.builder()
                .members(members)
                .roles(null)
                .type(ChannelType.DM)
                .build();
    }
}

