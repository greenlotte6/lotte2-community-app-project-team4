package com.example.integratedservices.config;

import com.example.integratedservices.adapter.LocalDateAdapter;
import com.example.integratedservices.adapter.LocalDateTimeAdapter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

  @Bean
  public Gson gson() {
    // LocalDate를 처리할 TypeAdapter 정의
    return new GsonBuilder()
        .registerTypeAdapter(LocalDate.class, new LocalDateAdapter())
        .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
        .setDateFormat("yyyy-MM-dd'T'HH:mm:ssX") // 다른 날짜 형식이 필요한 경우
        .create();
  }
}
