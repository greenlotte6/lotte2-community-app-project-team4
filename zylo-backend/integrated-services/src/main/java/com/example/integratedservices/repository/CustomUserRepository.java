package com.example.integratedservices.repository;

import com.example.integratedservices.dto.user.UserDTO;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomUserRepository {

  List<UserDTO> findAll(int size);
}
