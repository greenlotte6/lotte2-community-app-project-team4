package com.example.driveservice.controller;

import com.example.driveservice.service.DriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/drive/download", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileDownloadController {

  private final DriveService driveService;

  @GetMapping
  public ResponseEntity<Resource> download(@RequestHeader("X-User-Name") String username,
      @RequestHeader("X-Upload-Path") String uploadPath,
      @RequestHeader("X-File-Name") String filename) {
    //TODO: 클라이언트 쪽에서 uploadPath를 한번에 하나씩 전송
    ResponseInputStream<GetObjectResponse> responseStream = driveService.download(username,
        uploadPath, filename);
    if (responseStream != null) {
      String contentType = responseStream.response().contentType();
      InputStreamResource resource = new InputStreamResource(responseStream);
      return ResponseEntity.ok()
          .contentType(MediaType
              .parseMediaType(
                  contentType != null ? contentType : MediaType.APPLICATION_OCTET_STREAM_VALUE))
          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
          .body(resource);
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
