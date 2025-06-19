package com.example.driveservice.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "vfs")
@EqualsAndHashCode(callSuper = true)
public class File extends Node {

  @Field("size")
  private long size;

  @Field("mimeType")
  private String mimeType;
}
