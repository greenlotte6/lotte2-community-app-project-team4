package com.example.driveservice.document;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "uploads")
@Deprecated
public class UploadsDocument {

  @Id
  private String id;

  @Field("uid")
  private String uid;

  @Field("role")
  private String role;

  @Field("files")
  private List<FileDocument> files;

  @Field("currentCapacity")
  private long currentCapacity;

  @Field("capacity")
  private long capacity;
}
