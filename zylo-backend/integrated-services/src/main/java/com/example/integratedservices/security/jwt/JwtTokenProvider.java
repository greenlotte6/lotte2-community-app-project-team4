package com.example.integratedservices.security.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

  @Value("${jwt.secret}")
  private String secretKey;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
  }

  private String createToken(String username, String role, Instant expiry) {
    Instant now = Instant.now();

    return Jwts.builder()
        .subject(username)
        .claim("role", role)
        .issuedAt(Date.from(now))
        .expiration(Date.from(expiry))
        .signWith(getSigningKey(), Jwts.SIG.HS256)
        .compact();
  }

  // JWT에 포함시킬 credential을 인자로 전달
  public String createAccessToken(String username, String role) {
    Instant now = Instant.now();
    Instant expiry = now.plus(1, ChronoUnit.HOURS); // 1시간짜리 토큰
    return createToken(username, role, expiry);
  }

  public String createRefreshToken() {
    return UUID.randomUUID().toString();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser()
          .verifyWith(getSigningKey())
          .build()
          .parseSignedClaims(token);
      return true;
    } catch (JwtException | IllegalArgumentException e) {
      return false;
    }
  }

  public String getUsername(String token) {
    JwtParser parser = Jwts.parser()
        .verifyWith(getSigningKey())
        .build();
    return parser.parseSignedClaims(token).getPayload().getSubject();
  }
}
