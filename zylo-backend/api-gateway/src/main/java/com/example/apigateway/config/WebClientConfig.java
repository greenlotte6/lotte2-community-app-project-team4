package com.example.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

  @Bean
  public WebClient webClient(WebClient.Builder builder) {
    return builder.build(); // 공통 커스터마이징도 여기에
  }

  @Bean
  public WebClient.Builder webClientBuilder() {
    return WebClient.builder(); // 필요 시 baseUrl, timeout 등 설정
  }
}
