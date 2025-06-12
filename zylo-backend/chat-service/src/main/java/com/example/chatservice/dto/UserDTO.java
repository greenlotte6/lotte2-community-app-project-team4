package com.example.chatservice.dto;

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
}
