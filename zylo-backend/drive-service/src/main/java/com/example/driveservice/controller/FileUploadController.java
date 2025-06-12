package com.example.driveservice.controller;

import com.example.driveservice.exception.DriveUploadFailException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/drive/upload", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileUploadController {

  private final Gson gson;

  @Value("${aws.s3.name}")
  private String bucketName;

  private final S3Client s3Client;

  @PostMapping
  public ResponseEntity<String> upload(@RequestPart("file") MultipartFile file,
      @CookieValue("access_token") String accessToken) {
    if (file.isEmpty()) {
      JsonObject body = new JsonObject();
      body.addProperty("message", "빈 파일은 업로드할 수 없습니다.");
      return ResponseEntity.badRequest().body(gson.toJson(body));
    }

    try (InputStream in = file.getInputStream()) {
      String key = "drive/" + file.getOriginalFilename();//TODO: key를 drive/<userId>/filename 으로 변경
      log.info("{}::{}로 업로드 중...", bucketName, key);
      PutObjectRequest putObjectRequest = PutObjectRequest.builder()
          .bucket(bucketName)
          .key(key)
          .contentType(file.getContentType())
          .build();
      PutObjectResponse putResponse = s3Client.putObject(putObjectRequest,
          RequestBody.fromInputStream(in, file.getSize()));
      if (putResponse.sdkHttpResponse().isSuccessful()) {
        String message = String.format("%s로 정상적으로 업로드 되었습니다.", key);
        log.info(message);
        JsonObject body = new JsonObject();
        body.addProperty("message", message);
        return ResponseEntity.ok(gson.toJson(body));
      } else {
        throw new DriveUploadFailException(
            "S3 업로드 실패. 상태 코드: " + putResponse.sdkHttpResponse().statusCode());
      }
    } catch (S3Exception | IOException e) {
      JsonObject body = new JsonObject();
      body.addProperty("message", e.getMessage());
      return ResponseEntity.internalServerError().body(gson.toJson(body));
    } catch (DriveUploadFailException e) {
      return ResponseEntity.internalServerError().body(gson.toJson(e));
    }
  }
}
