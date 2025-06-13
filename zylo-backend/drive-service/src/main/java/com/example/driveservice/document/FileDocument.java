package com.example.driveservice.document;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class FileDocument {

  @Field("uploadPath")
  private String uploadPath;

  @Field("filename")
  private String filename;

  @Field("size")
  private long size;

  @Field("mimeType")
  private String mimeType;

  @Field("upload_date")
  private LocalDateTime uploadDate;
}
