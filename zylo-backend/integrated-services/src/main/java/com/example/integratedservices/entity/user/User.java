package com.example.integratedservices.entity.user;

import com.example.integratedservices.entity.plan.Plan;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {

  @Id
  private String id;

  @Column(name = "name")
  private String name;

  @Column(name = "email")
  private String email;

  @Column(name = "name")
  private String name;

  @Column(name = "dept")
  private String dept;

  @Column(name = "password")
  private String password;

  @JoinColumn(name = "profile_image_id")
  @OneToOne(fetch = FetchType.LAZY)
  private ProfileImages profileImage;

  @JoinColumn(name = "plan_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private Plan plan;

  @Column(name = "status")
  private String status;
}
