package com.example.integratedservices.service.user;

import com.example.integratedservices.dto.auth.SignUpDTO;
import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.entity.user.User;
import com.example.integratedservices.exception.DuplicateUsernameException;
import com.example.integratedservices.exception.IllegalRefreshTokenException;
import com.example.integratedservices.exception.IllegalUsernameException;
import com.example.integratedservices.exception.PasswordNotEqualsException;
import com.example.integratedservices.repository.jpa.user.UserRepository;
import com.example.integratedservices.repository.redis.RefreshTokenRepository;
import com.example.integratedservices.security.jwt.JwtTokenProvider;
import com.google.gson.Gson;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

  @Value("${jwt.cookie.domain}")
  private String domain;

  @Value("${jwt.cookie.same-site}")
  private String sameSite;

  @Value("${jwt.cookie.secure}")
  private boolean secure;

  private final PasswordEncoder encoder;
  private final JwtTokenProvider tokenProvider;
  private final UserRepository repo;
  private final RefreshTokenRepository refreshTokenRepo;
  private final Gson gson;

  private void checkPassword(String password, String passwordConfirm) {
    if (!password.equals(passwordConfirm)) {
      throw new PasswordNotEqualsException("Passwords do not match");
    }
  }

  private void checkUsername(String username) throws DuplicateUsernameException {
    long idCount = repo.countByUserId(username);
    if (idCount > 0) {
      String message = String.format("아이디 %s가 이미 존재합니다.", username);
      throw new DuplicateUsernameException(message);
    }
  }

  private boolean checkUsernameExists(String username) throws IllegalUsernameException {
    long idCount = repo.countByUserId(username);
    if (idCount == 0) {
      return false;
    } else {
      return true;
    }
  }

  public String getAll(int size) {
    List<UserDTO> users = repo.findAll(size);
    return gson.toJson(users);
  }

  public void signUp(SignUpDTO signUpDTO)
      throws PasswordNotEqualsException, DuplicateUsernameException {
    checkPassword(signUpDTO.getPassword(), signUpDTO.getPasswordConfirm());
    checkUsername(signUpDTO.getUserId());

    String encryptedPassword = encoder.encode(signUpDTO.getPassword());

    UserDTO userDTO = UserDTO.builder()
        .id(signUpDTO.getUserId())
        .email(signUpDTO.getEmail())
        .password(encryptedPassword)
        .planId(1)
        .planNameId(1)
        .status("normal")
        .build();
    User userEntity = userDTO.toEntity();
    repo.save(userEntity);
  }

  private ResponseCookie createCookieFrom(String name, String token, Duration maxAge) {
    return ResponseCookie.from(name, token)
        .httpOnly(true)
        .secure(secure)
        .path("/")
        .domain(domain)
        .maxAge(maxAge)
        .sameSite(sameSite)
        .build();
  }

  //AuthenticationManager.authenticate()에서 인증 완료된 user만 전달 됨.
  public ResponseCookie getAccessToken(String userId) {
    String planName = repo.findPlanNameByUserId(userId).getPlanName();
    log.info("Access JWT 발급 중...");
    String token = tokenProvider.createAccessToken(userId, planName);
    log.info("Access JWT 발급 완료: {}", token);
    return createCookieFrom("access_token", token, Duration.ofMinutes(60));
  }

  public ResponseCookie getRefreshToken(String userId) {
    Duration expiry = Duration.ofDays(7);
    log.info("Refresh JWT 발급 중...");
    String token = tokenProvider.createRefreshToken();
    log.info("Refresh JWT 발급 완료: {}", token);
    refreshTokenRepo.save(userId, token, expiry);
    return createCookieFrom("refresh_token", token, expiry);
  }

  public ResponseCookie getRefreshedAccessToken(String refreshToken)
      throws IllegalRefreshTokenException {
    Optional<String> result = refreshTokenRepo.findUserIdByToken(refreshToken);
    if (result.isPresent()) {
      String userId = result.get();
      String planName = repo.findPlanNameByUserId(userId).getPlanName();
      String accessToken = tokenProvider.createAccessToken(userId, planName);
      return createCookieFrom("access_token", accessToken, Duration.ofMinutes(60));
    } else {
      throw new IllegalRefreshTokenException("유효하지 않거나 존재하지 않는 토큰: " + refreshToken);
    }
  }
}
