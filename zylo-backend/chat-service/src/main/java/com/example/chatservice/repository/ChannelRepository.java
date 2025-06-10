package com.example.chatservice.repository;

import com.example.chatservice.model.Channel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends MongoRepository<Channel, String> {

    /**
     * 특정 사용자가 참여한 모든 채널 조회
     */
    List<Channel> findByMembersContaining(String userId);

    /**
     * 특정 유저 조합의 DM 채널이 존재하는지 확인
     * (두 사람 모두 포함된 DM 채널을 찾음)
     */
    Optional<Channel> findByMembersInAndType(List<String> members, Channel.ChannelType type);

    /**
     * 특정 개설자의 채널 목록 조회 (옵션)
     */
    List<Channel> findByOwnerId(String ownerId);

    /**
     * 채널 이름으로 검색 (예: 메뉴에 표시할 채널 검색)
     */
    List<Channel> findByNameContaining(String keyword);
}