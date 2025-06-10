package com.example.integratedservices.controller;

import com.example.integratedservices.dto.auth.SignUpDTO;
import com.example.integratedservices.dto.response.SuccessResponseDTO;
import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthController {

  private final UserService service;

  @PostMapping("/signup")
  public ResponseEntity<Object> signup(@RequestBody SignUpDTO signUpRequest) {
    service.signUp(signUpRequest);
    SuccessResponseDTO body = new SuccessResponseDTO("회원가입이 정상적으로 처리되었습니다.");
    return ResponseEntity.ok(body);
  }

  @PostMapping("/login")
  public ResponseEntity<Object> login(@RequestBody UserDTO userDTO) {
    service.login(userDTO);
    SuccessResponseDTO successResponse = new SuccessResponseDTO("로그인이 완료되었습니다.");
    return ResponseEntity.ok(successResponse);
  }
}
