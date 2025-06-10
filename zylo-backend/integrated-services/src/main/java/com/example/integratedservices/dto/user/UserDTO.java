package com.example.integratedservices.dto.user;

import com.example.integratedservices.entity.plan.Plan;
import com.example.integratedservices.entity.plan.PlanName;
import com.example.integratedservices.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

  private String id;
  private String email;
  private String password;
  private int profileImageId;
  private String profileImageUploadPath;
  private int planId;
  private int planNameId;
  private String planName;
  private String status;

  public User toEntity() {
    PlanName planNameEntity = PlanName.builder()
        .id(planNameId)
        .name(planName)
        .build();

    Plan plan = Plan.builder()
        .id(planId)
        .name(planNameEntity)
        .build();

    return User.builder()
        .id(id)
        .email(email)
        .password(password)
        .plan(plan)
        .status(status)
        .build();
  }
}
