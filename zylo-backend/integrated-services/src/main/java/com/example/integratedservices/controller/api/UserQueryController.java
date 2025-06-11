package com.example.integratedservices.controller.api;

import com.example.integratedservices.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserQueryController {

  private final UserService service;

  @GetMapping("/all")
  public ResponseEntity<String> getUser(@RequestParam(name = "size", defaultValue = "5") int size) {
    String result = service.getAll(size);
    return ResponseEntity.ok(result);
  }
}
