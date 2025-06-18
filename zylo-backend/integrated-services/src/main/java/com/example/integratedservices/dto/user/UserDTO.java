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
  private String name;
  private String dept;
  private String password;
  private int profileImageId;
  private String profileImageUploadPath;
  private int planId;
  private int planNameId;
  private String planName;
  private String status;

  public UserDTO(String id, String name, String dept, String email,
      String profileImageUploadPath, String planName, String status) {
    this.id = id;
    this.name = name;
    this.dept = dept;
    this.password = password;
    this.email = email;
    this.profileImageId = profileImageId;
    this.profileImageUploadPath = profileImageUploadPath;
    this.planId = planId;
    this.planNameId = planNameId;
    this.planName = planName;
    this.status = status;
  }

  public UserDTO(String planName) {
    this.planName = planName;
  }

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
        .name(name)
        .dept(dept)
        .email(email)
        .password(password)
        .plan(plan)
        .status(status)
        .build();
  }
}
