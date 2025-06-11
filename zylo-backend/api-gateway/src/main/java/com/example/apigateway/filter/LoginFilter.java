package com.example.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class LoginFilter implements GatewayFilter {

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    // TODO 1. Request에서 JWT 가져오기
    // TODO 2. /auth/login 요청 보내고 응답 받기.
    // TODO 3. 인증 실패 시 401 응답 보내기
    // TODO 4. 인증 성공 시
    return null;
  }
}
