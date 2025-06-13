package com.example.driveservice.controller;

import com.example.driveservice.dto.SuccessResponseBody;
import com.example.driveservice.dto.UserHeaderDTO;
import com.example.driveservice.exception.DriveUploadFailException;
import com.example.driveservice.exception.IllegalUsernameException;
import com.example.driveservice.exception.OutOfCapacityException;
import com.example.driveservice.service.UploadService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/drive/upload", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileUploadController {

  private final Gson gson;
  private final UploadService uploadService;

  @PostMapping
  public ResponseEntity<String> upload(@RequestPart("file") MultipartFile file,
      @RequestHeader("X-User-Name") String username,
      @RequestHeader("X-User-Role") String role,
      @RequestHeader("X-Upload-Path") String uploadPath
  ) {
    UserHeaderDTO headers = UserHeaderDTO.builder()
        .uid(username)
        .role(role)
        .uploadPath(uploadPath)
        .build();

    if (file.isEmpty()) {
      JsonObject body = new JsonObject();
      body.addProperty("message", "빈 파일은 업로드할 수 없습니다.");
      return ResponseEntity.badRequest().body(gson.toJson(body));
    }

    try {
      String uploadedS3Key = uploadService.upload(headers, file);
      String message = String.format("%s로 정상적으로 업로드 되었습니다.", uploadedS3Key);
      SuccessResponseBody body = new SuccessResponseBody(message);
      return ResponseEntity.ok(gson.toJson(body));
    } catch (S3Exception | IOException e) {
      JsonObject body = new JsonObject();
      body.addProperty("message", e.getMessage());
      return ResponseEntity.internalServerError().body(gson.toJson(body));
    } catch (DriveUploadFailException e) {
      return ResponseEntity.internalServerError().body(gson.toJson(e.getMessage()));
    } catch (OutOfCapacityException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(gson.toJson(e.getMessage()));
    } catch (IllegalUsernameException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(gson.toJson(e.getMessage()));
    }
  }
}
