package com.example.integratedservices.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpDTO {

  private String userId;
  private String name;
  private String email;
  private String password;
  private String passwordConfirm;
}
