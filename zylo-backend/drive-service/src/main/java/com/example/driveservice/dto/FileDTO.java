package com.example.driveservice.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileDTO {

  private String userId;
  private String name;
  private boolean isDirectory;
  private String uploadPath;
  private LocalDate uploadDate;
  private long size;
}
