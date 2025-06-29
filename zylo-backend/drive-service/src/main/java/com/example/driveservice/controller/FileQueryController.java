package com.example.driveservice.controller;

import com.example.driveservice.document.UploadsDocument;
import com.example.driveservice.dto.MkdirRequest;
import com.example.driveservice.service.DriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/drive", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileQueryController {

  private final DriveService service;

  @GetMapping("/list")
  public UploadsDocument list(@RequestHeader("X-User-Name") String username) {
    return service.list(username);
  }

  @PostMapping("/mkdir")
  public ResponseEntity<String> mkdir(@RequestHeader("X-User-Name") String username,
      MkdirRequest request) {
    // TODO: Impl this
    return null;
  }

  @PutMapping("/mv")
  public ResponseEntity<String> move() {
    // TODO: Impl this
    return null;
  }

  @DeleteMapping("/rm")
  public ResponseEntity<String> remove() {
    // TODO: Impl this
    return null;
  }
}
