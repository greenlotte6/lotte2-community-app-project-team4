package com.example.integratedservices.repository.redis;

import java.time.Duration;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisRefreshTokenRepository implements RefreshTokenRepository {

  private static final String PREFIX = "refresh_token:";
  private final RedisTemplate<String, String> template;

  @Override
  public void save(String username, String refreshToken, Duration expiry) {
    template.opsForValue().set(PREFIX + refreshToken, username, expiry);
  }

  @Override
  public Optional<String> findUserIdByToken(String refreshToken) {
    String token = template.opsForValue().get(PREFIX + refreshToken);
    return Optional.ofNullable(token);
  }

  @Override
  public void deleteByToken(String refreshToken) {
    template.delete(PREFIX + refreshToken);
  }
}
