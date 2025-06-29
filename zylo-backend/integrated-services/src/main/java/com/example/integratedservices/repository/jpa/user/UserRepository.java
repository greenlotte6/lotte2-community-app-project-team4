package com.example.integratedservices.repository.jpa.user;

import com.example.integratedservices.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String>, CustomUserRepository {

}
