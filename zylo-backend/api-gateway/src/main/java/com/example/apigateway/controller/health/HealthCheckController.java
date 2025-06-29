package com.example.apigateway.controller.health;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

  @GetMapping(value = "/v1/health", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> healthCheck() {
    String json = String.format("{%n\t\"status\": \"healthy\"%n}");
    return ResponseEntity.ok(json);
  }
}
