package com.example.integratedservices.controller.api;

import com.example.integratedservices.dto.user.UserDTO;
import com.example.integratedservices.security.jwt.JwtTokenProvider;
import com.example.integratedservices.service.user.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserQueryController {

  private final UserService service;
  private final JwtTokenProvider tokenProvider;

  @GetMapping
  public ResponseEntity<UserDTO> getUser(@CookieValue("access_token") String token) {
    String username = tokenProvider.getUsername(token);
    UserDTO user = service.get(username);

    if (user == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
  }

  @GetMapping
  public ResponseEntity<List<UserDTO>> getUsers() {
    // TODO: Impl this
    return null;
  }

  @GetMapping("/all")
  public ResponseEntity<String> getUsers(
      @RequestParam(name = "size", defaultValue = "5") int size) {
    String result = service.getAll(size);
    return ResponseEntity.ok(result);
  }
}
