package com.example.driveservice.dao.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class VfsCacheRepository {

  private static final String PREFIX = "vfs";
  private final RedisTemplate<String, String> template;

  public void cache(String username, String serializedVfs) {
    String key = PREFIX + ":" + username;
    ValueOperations<String, String> ops = template.opsForValue();
  }

  public String get(String username) {
    return template.opsForValue().get(PREFIX + ":" + username);
  }

  public void invalidate(String username) {

  }
}
