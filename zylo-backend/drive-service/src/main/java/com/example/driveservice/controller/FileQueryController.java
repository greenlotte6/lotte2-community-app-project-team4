package com.example.driveservice.controller;

import com.example.driveservice.document.UploadsDocument;
import com.example.driveservice.service.UploadService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/drive", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileQueryController {

  private UploadService service;

  @GetMapping("/list")
  public ResponseEntity<String> list(@RequestHeader("X-User-Name") String username) {
    List<UploadsDocument> documents = service.list(username);
    return ResponseEntity.ok().body(documents.toString());
  }
}
