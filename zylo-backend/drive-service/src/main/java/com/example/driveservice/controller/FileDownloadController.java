package com.example.driveservice.controller;

import com.example.driveservice.service.DriveService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/drive/download", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileDownloadController {

  private final DriveService driveService;

  @GetMapping
  public ResponseEntity<Resource> download(@RequestHeader("X-User-Name") String username,
      List<String> uploadPaths) {

    return null;
  }
}
