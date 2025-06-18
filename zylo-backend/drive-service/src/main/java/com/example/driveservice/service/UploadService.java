package com.example.driveservice.service;

import com.example.driveservice.dao.DriveRepository;
import com.example.driveservice.document.FileDocument;
import com.example.driveservice.document.UploadsDocument;
import com.example.driveservice.dto.UserHeaderDTO;
import com.example.driveservice.exception.DriveUploadFailException;
import com.example.driveservice.exception.IllegalUsernameException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Slf4j
@Service
@RequiredArgsConstructor
public class UploadService {

  private final S3Client s3Client;
  private final DriveRepository repo;

  @Value("${aws.s3.name}")
  private String bucketName;

  private FileDocument createMetaData(String uploadPath, MultipartFile file) {
    String filename = file.getOriginalFilename();
    long size = file.getSize();
    String mimeType = file.getContentType();
    LocalDateTime now = LocalDateTime.now();

    return FileDocument.builder()
        .filename(filename)
        .size(size)
        .mimeType(mimeType)
        .uploadPath(uploadPath)
        .uploadDate(now)
        .build();
  }

  private void saveMetadata(String username, FileDocument fileDocument) {
    repo.save(username, fileDocument);
  }

  private PutObjectResponse doUploadToS3(String s3Key, MultipartFile file)
      throws S3Exception, IOException {
    InputStream in = file.getInputStream();
    PutObjectRequest putObjectRequest = PutObjectRequest.builder()
        .bucket(bucketName)
        .key(s3Key)
        .contentType(file.getContentType())
        .build();
    return s3Client.putObject(putObjectRequest,
        RequestBody.fromInputStream(in, file.getSize()));
  }

  @Transactional
  public String upload(UserHeaderDTO headers, MultipartFile file)
      throws S3Exception, IOException, DriveUploadFailException, IllegalUsernameException {
    // 지역 변수
    String filename = file.getOriginalFilename();
    String username = headers.getUid();
    String uploadPath = headers.getUploadPath();
    String s3Key = "drive/" + username + uploadPath + "/" + filename;
    FileDocument fileDocument = createMetaData(s3Key, file);

    PutObjectResponse putResponse = doUploadToS3(s3Key, file); // S3에 업로드
    if (!putResponse.sdkHttpResponse().isSuccessful()) {  // S3 업로드 실패
      throw new DriveUploadFailException(
          "S3 업로드 실패. 상태 코드: " + putResponse.sdkHttpResponse().statusCode());
    } else {  // S3 업로드 성공
      saveMetadata(username, fileDocument); // MongoDB에 메타데이터 저장
      return s3Key;
    }
  }

  public UploadsDocument list(String username) {
    return repo.findAllByUsername(username);
  }
}
