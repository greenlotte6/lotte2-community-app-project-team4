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
    @Query(value = "{ $or: [ { 'members': ?0 }, { 'ownerId': ?0 } ] }", sort = "{ 'createdAt': -1 }")
    List<Channel> findUserChannelsIncludingOwner(String userId);


}