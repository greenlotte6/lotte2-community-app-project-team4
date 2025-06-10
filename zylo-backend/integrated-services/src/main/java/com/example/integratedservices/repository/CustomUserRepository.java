package com.example.integratedservices.repository;

import com.example.integratedservices.dto.user.UserDTO;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomUserRepository {

  /**
   * 사용자의 아이디, 프로필 이미지, 플랜, 상태에 대한 데이터를 조회
   *
   * @param size 한 번 조회할 때 최대 데이터 개수
   * @return List of UserDTO
   */
  List<UserDTO> findAll(int size);

  UserDTO findByUserId(String userId);

  long countByUserId(String userId);
}
