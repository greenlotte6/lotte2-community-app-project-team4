package com.example.driveservice.fs;

import com.example.driveservice.exception.VfsDeserializationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class VirtualFileSystemDeserializer {

  private final ObjectMapper mapper;

  public VirtualFileSystem deserialize(String json) throws VfsDeserializationException {
    try {
      return mapper.readValue(json, InMemoryFileSystem.class);
    } catch (JsonProcessingException e) {
      String message = "캐시된 VFS를 역직렬화 하는 도중 예외가 발생했습니다.";
      throw new VfsDeserializationException(message, e.getCause());
    }
  }
}
