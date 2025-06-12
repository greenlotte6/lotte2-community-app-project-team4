package com.example.integratedservices.controller.healthcheck;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class HealthCheckController {

  private final Gson gson;

  @GetMapping(value = "/healthcheck", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> healthCheck() {
    String message = "Health Check OK";
    JsonObject json = new JsonObject();
    json.addProperty("message", message);
    return ResponseEntity.ok(gson.toJson(json));
  }
}
