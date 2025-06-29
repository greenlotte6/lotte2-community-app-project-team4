package com.example.driveservice.document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = File.class, name = "file"),
    @JsonSubTypes.Type(value = Directory.class, name = "directory")
})
@JsonPropertyOrder({
    "id", "nodeId", "owner", "filename", "isDir",
    "depth", "parentId", "path", "lastModified",
    "size", "mimeType", "children"
})
public abstract class Node {

  @Id
  @JsonProperty("id")
  protected String id;

  @Field("nodeId")
  @JsonProperty("nodeId")
  protected String nodeId;

  @Field("owner")
  @JsonProperty("owner")
  protected String owner;

  @Field("filename")
  @JsonProperty("filename")
  protected String filename;

  @Field("isDir")
  @JsonProperty("isDir")
  protected boolean isDir;

  @Field("depth")
  @JsonProperty("depth")
  protected int depth;

  @Field("parentId")
  @JsonProperty("parentId")
  protected String parentId;

  @Field("path")
  @JsonProperty("path")
  protected String path;

  @Field("lastModified")
  @JsonProperty("lastModified")
  protected LocalDateTime lastModified;

  @Transient
  @JsonIgnore
  protected boolean dirty;

  public void markDirty() {
    this.dirty = true;
  }

  public void clean() {
    this.dirty = false;
  }
}
