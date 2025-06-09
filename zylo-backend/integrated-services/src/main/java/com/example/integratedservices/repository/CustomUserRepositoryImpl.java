package com.example.integratedservices.repository;

import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.entity.user.QProfileImages;
import com.example.integratedservices.entity.user.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomUserRepositoryImpl implements CustomUserRepository {

  private final JPAQueryFactory query;
  private final QUser user = QUser.user;
  private final QProfileImages profileImages = QProfileImages.profileImages;

  @Override
  public List<UserDTO> findAll(int size) {
    // id, email, profile image upload path만 조회.
    // DTO Projection을 사용해서 조회 결과를 바로 DTO로 반환.
    // UserDTO에 id, email, profileImageId, profileImageUploadPath를 인자로 사용하는 생성자를 직접 생성해야함.
    return query
        .select(Projections.constructor(UserDTO.class, user.id, user.email, user.profileImage.id,
            user.profileImage.uploadPath))
        .from(user)
        .leftJoin(user.profileImage, profileImages)
        .limit(size)
        .orderBy(user.id.asc())
        .fetch();
  }
}
