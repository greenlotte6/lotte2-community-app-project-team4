package com.example.integratedservices.dto.user;

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
  private String status;

  public UserDTO(String id, String email, int profileImageId, String profileImageUploadPath) {
    this.id = id;
    this.email = email;
    this.profileImageId = profileImageId;
    this.profileImageUploadPath = profileImageUploadPath;
  }
}
