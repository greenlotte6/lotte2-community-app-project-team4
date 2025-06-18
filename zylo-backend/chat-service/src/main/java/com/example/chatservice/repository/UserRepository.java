package com.example.chatservice.repository;


import com.example.chatservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * username 으로 사용자 조회 (로그인, 중복체크 등)
     */
    Optional<User> findByUsername(String username);

    /**
     * 이메일로 사용자 조회
     */
    Optional<User> findByEmail(String email);

    /**
     * 특정 역할(BASIC / PREMIUM) 사용자 목록 조회 (옵션)
     */
    List<User> findByRole(User.Role role);

}