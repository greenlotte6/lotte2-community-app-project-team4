package com.example.driveservice.dao;

import com.example.driveservice.fs.VirtualFileSystem;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class VfsCacheRepository {

  private static final String PREFIX = "vfs";
  private final RedisTemplate<String, String> template;

  public void cache(VirtualFileSystem vfs) {

  }

  public void invalidate(String key) {

  }
}
