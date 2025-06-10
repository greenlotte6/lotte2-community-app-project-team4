package com.example.integratedservices.repository;

import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.entity.plan.QPlan;
import com.example.integratedservices.entity.plan.QPlanName;
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
  private final QPlan plan = QPlan.plan;
  private final QPlanName planName = QPlanName.planName;

  @Override
  public List<UserDTO> findAll(int size) {
    // id, email, profile image upload path만 조회.
    // DTO Projection을 사용해서 조회 결과를 바로 DTO로 반환.
    // UserDTO에 id, email, profileImageId, profileImageUploadPath를 인자로 사용하는 생성자를 직접 생성해야함.
    return query
        .select(Projections.constructor(UserDTO.class, user.id, user.email, user.password,
            profileImages.id, profileImages.uploadPath, plan.id, planName.name, user.status))
        .from(user)
        .leftJoin(user.profileImage, profileImages)
        .join(user.plan, plan)
        .join(plan.name, planName)
        .limit(size)
        .orderBy(user.id.asc())
        .fetch();
  }

  @Override
  public UserDTO findByUserId(String userId) {
    return query
        .select(Projections.constructor(UserDTO.class, user.id, user.profileImage.id,
            user.profileImage.uploadPath, plan.id, planName.name, user.status))
        .from(user)
        .leftJoin(user.profileImage, profileImages)
        .join(user.plan, plan)
        .join(plan.name, planName)
        .where(user.id.eq(userId))
        .orderBy(user.id.asc())
        .fetchOne();
  }

  @Override
  public long countByUserId(String userId) {
    Long result = query.select(user.id.count()).from(user).where(user.id.eq(userId)).fetchFirst();
    return result == null ? 0 : result;
  }
}
