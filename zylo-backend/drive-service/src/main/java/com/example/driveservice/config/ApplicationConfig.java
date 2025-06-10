package com.example.driveservice.config;

import com.example.driveservice.adapter.LocalDateAdapter;
import com.example.driveservice.adapter.LocalDateTimeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class ApplicationConfig {

  @Value("${aws.region}")
  private String region;

  @Bean
  public Gson gson() {
    // LocalDate를 처리할 TypeAdapter 정의
    return new GsonBuilder()
        .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
        .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
        .setDateFormat("yyyy-MM-dd'T'HH:mm:ssX") // 다른 날짜 형식이 필요한 경우
        .create();
  }

  @Bean
  public S3Client s3Client() {
    return S3Client.builder()
        .region(Region.of(region))
        .credentialsProvider(DefaultCredentialsProvider.create())
        .build();
  }
}
