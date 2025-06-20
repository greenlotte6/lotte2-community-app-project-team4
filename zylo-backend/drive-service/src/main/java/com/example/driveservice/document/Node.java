package com.example.driveservice.document;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Node {

  @Id
  protected String id;

  @Field("nodeId")
  protected String nodeId;

  @Field("owner")
  protected String owner;

  @Field("filename")
  protected String filename;

  @Field("isDir")
  protected boolean isDir;

  @Field("depth")
  protected int depth;

  @Field("parentId")
  protected String parentId;

  @Field("path")
  protected String path;

  @Field("lastModified")
  protected LocalDateTime lastModified;

  protected boolean dirty;

  public void markDirty() {
    this.dirty = true;
  }

  public void clean() {
    this.dirty = false;
  }
}
