package com.example.driveservice.document;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public abstract class Node {

  @Id
  private String id;

  @Field("nodeId")
  private String nodeId;

  @Field("owner")
  private String owner;

  @Field("filename")
  private String filename;

  @Field("isDir")
  private boolean isDir;

  @Field("depth")
  private int depth;

  @Field("parentId")
  private String parentId;

  @Field("path")
  private String path;

  @Field("lastModified")
  private LocalDateTime lastModified;

  protected boolean dirty;

  public void markDirty() {
    this.dirty = true;
  }

  public void clean() {
    this.dirty = false;
  }
}
