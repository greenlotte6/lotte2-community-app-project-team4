package com.example.chatservice.repository;

import com.example.chatservice.model.Channel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends MongoRepository<Channel, String> {

    // 특정 사용자가 참여한 모든 채널 조회 ( 최신순)
    List<Channel> findByMembersContainingOrderByCreatedAtDesc(String userId);

    /**
     * 두 사용자가 모두 멤버이며 type = DM 인 채널 조회
     *  - members 배열에 ownerId 와 opponentId 가 모두 들어 있다
     *  - type 이 'DM' 인 문서
     */
    @Query("{ type: 'DM', members: { $all: [?0, ?1] } }")
    Optional<Channel> findDmChannel(String ownerId, String opponentId);


}