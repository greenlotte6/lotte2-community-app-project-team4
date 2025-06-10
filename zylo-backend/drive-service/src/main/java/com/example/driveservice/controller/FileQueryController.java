package com.example.driveservice.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/drive", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileQueryController {

  @GetMapping("/list")
  public ResponseEntity<String> list() {
    return null;
  }
}
