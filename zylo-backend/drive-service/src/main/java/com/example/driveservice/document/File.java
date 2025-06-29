package com.example.driveservice.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "vfs")
@EqualsAndHashCode(callSuper = true)
@JsonPropertyOrder({})
public class File extends Node {

  @Field("size")
  @JsonProperty("size")
  private long size;

  @Field("mimeType")
  @JsonProperty("mimeType")
  private String mimeType;
}
