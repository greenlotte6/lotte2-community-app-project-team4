package com.example.integratedservices.controller.auth;

import com.example.integratedservices.dto.auth.SignUpDTO;
import com.example.integratedservices.dto.response.SuccessResponseDTO;
import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authManager;
  private final UserService service;

  @PostMapping("/signup")
  public ResponseEntity<Object> signup(@RequestBody SignUpDTO signUpRequest) {
    service.signUp(signUpRequest);
    SuccessResponseDTO body = new SuccessResponseDTO("회원가입이 정상적으로 처리되었습니다.");
    return ResponseEntity.ok(body);
  }

  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody UserDTO userDTO,
      @CookieValue(value = "refresh_token", required = false) String refreshToken) {
    UsernamePasswordAuthenticationToken authToken =
        new UsernamePasswordAuthenticationToken(userDTO.getId(), userDTO.getPassword());
    authManager.authenticate(authToken); //사용자 ID, PW 인증. 인증 실패 시 자동으로 에러 응답 전송

    HttpHeaders headers = new HttpHeaders();
    if (refreshToken != null) {
      log.info("리프레시 토큰이 이미 발급된 것으로 보이지만, 추가 검증이 필요합니다.");
      ResponseCookie newAccessToken = service.getRefreshedAccessToken(refreshToken);
      headers.set(HttpHeaders.SET_COOKIE, newAccessToken.toString());
    } else {
      log.info("신규 토큰을 발급합니다.");
      String userId = userDTO.getId();
      ResponseCookie accessToken = service.getAccessToken(userId);
      ResponseCookie newRefreshToken = service.getRefreshToken(userId);
      headers.add(HttpHeaders.SET_COOKIE, accessToken.toString());
      headers.add(HttpHeaders.SET_COOKIE, newRefreshToken.toString());
    }

    return ResponseEntity.ok()
        .headers(headers)
        .body(new SuccessResponseDTO("로그인 성공"));
  }

  @PostMapping("/refresh")
  public ResponseEntity<Object> refresh(@CookieValue("refresh_token") String refreshToken) {
    ResponseCookie newAccessTokenCookie = service.getRefreshedAccessToken(refreshToken);
    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, newAccessTokenCookie.toString())
        .body(new SuccessResponseDTO("토큰 갱신 성공"));
  }
}
