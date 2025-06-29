package com.example.driveservice.fs;

import com.example.driveservice.dao.mongo.DriveRepository;
import com.example.driveservice.dao.redis.VfsCacheRepository;
import com.example.driveservice.document.Directory;
import com.example.driveservice.exception.VfsDeserializationException;
import com.example.driveservice.service.UploadService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class VirtualFileSystemFactory {

  private final DriveRepository driveRepo;
  private final VfsCacheRepository cacheRepo;
  private final UploadService uploadService;
  private final ObjectMapper mapper;


  private VirtualFileSystem createNewVfs(Directory entryNode, String username,
      String subscription) {
    long maxSize = 0;
    if (subscription.equalsIgnoreCase("free")) {
      maxSize = 512 * 1048576; // 512MB
    } else if (subscription.equalsIgnoreCase("plus")) {
      maxSize = 1024 * 1024 * 1024; // 1GB
    }

    return new InMemoryFileSystem(entryNode, username, subscription, 0,
        maxSize, driveRepo, cacheRepo, uploadService);
  }

  private VirtualFileSystem getVfsFromCache(String username) throws VfsDeserializationException {
    String serializedVfs = cacheRepo.get(username);

    if (serializedVfs == null) {
      return null;
    }

    try {
      return mapper.readValue(serializedVfs, InMemoryFileSystem.class);
    } catch (JsonProcessingException e) {
      String message = "VFS 캐시를 역직렬화 하는 도중 예외가 발생했습니다.";
      throw new VfsDeserializationException(message, e.getCause());
    }
  }

  public VirtualFileSystem create(Directory entry, String username, String subscription)
      throws VfsDeserializationException {
    VirtualFileSystem cachedVfs = getVfsFromCache(username);

    if (cachedVfs != null) {
      return cachedVfs;
    }

    return createNewVfs(entry, username, subscription);
  }

}
