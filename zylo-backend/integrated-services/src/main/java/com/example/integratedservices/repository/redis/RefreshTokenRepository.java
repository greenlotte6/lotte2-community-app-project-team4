package com.example.integratedservices.repository.redis;

import java.time.Duration;
import java.util.Optional;

public interface RefreshTokenRepository {

  void save(String username, String refreshToken, Duration expiry);

  Optional<String> findUserIdByToken(String refreshToken);

  void deleteByToken(String refreshToken);
}
