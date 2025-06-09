package com.example.integratedservices.entity.plan;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
@Table(name = "plan")
public class Plan {

  @Id
  private int id;

  @JoinColumn(name = "name_id")
  @ManyToOne(fetch = FetchType.LAZY)
  private PlanName name;

  @JoinColumn(name = "benefit_id")
  @OneToOne(fetch = FetchType.LAZY)
  private PlanBenefits benefits;

}
