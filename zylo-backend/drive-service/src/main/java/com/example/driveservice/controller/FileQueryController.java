package com.example.driveservice.controller;

import com.example.driveservice.document.UploadsDocument;
import com.example.driveservice.service.DriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
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
}
