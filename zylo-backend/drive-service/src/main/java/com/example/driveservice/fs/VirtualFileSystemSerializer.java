package com.example.driveservice.fs;

import com.example.driveservice.document.Directory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VirtualFileSystemSerializer {

  private final ObjectMapper mapper;

  public String serialize(VirtualFileSystem vfs) throws JsonProcessingException {
    mapper.registerModule(new JavaTimeModule());
    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    Directory root = vfs.root();
    return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(root);
  }
}
