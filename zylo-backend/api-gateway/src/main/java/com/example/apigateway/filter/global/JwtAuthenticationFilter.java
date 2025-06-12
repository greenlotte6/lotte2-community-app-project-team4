package com.example.apigateway.filter.global;

import com.example.apigateway.properties.EndpointProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

  @Value("${zylo.endpoints.integrated-services.uri}")
  private String integratedServices;

  @Value("${zylo.endpoints.integrated-services.path.auth.validation}")
  private String jwtValidationPath;

  private final EndpointProperties endpointProperties;

  private final WebClient client;

  public JwtAuthenticationFilter(WebClient.Builder webClient,
      EndpointProperties endpointProperties) {
    this.client = webClient.baseUrl(integratedServices).build();
    this.endpointProperties = endpointProperties;
  }

  private boolean isExcludedPath(String path) {
    return endpointProperties.getExcludedPaths().contains(path);
  }

  private Mono<Void> unauthorized(ServerWebExchange exchange) {
    log.info("Unauthorized");
    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
    return exchange.getResponse().setComplete();
  }

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    if (isExcludedPath(exchange.getRequest().getPath().value())) { //JWT 인증이 필요없는 URL로의 요청인 경우
      return chain.filter(exchange);
    }

    log.info("{}(으)로의 요청을 감지했습니다. JWT 검증을 시작합니다.", exchange.getRequest().getURI());
    HttpCookie accessTokenCookie = exchange.getRequest()
        .getCookies()
        .getFirst("access_token");

    if (accessTokenCookie == null) { //Access Token 쿠키가 없는 경우
      log.info("JWT 검증에 실패하였습니다. JWT는 NULL이 될 수 없습니다.");
      return unauthorized(exchange); // Response 401
    }

    String validationUrl = integratedServices + jwtValidationPath;

    return client.get()
        .uri(validationUrl)
        .header(HttpHeaders.COOKIE,
            accessTokenCookie.getName() + "=" + accessTokenCookie.getValue())
        .retrieve()
        .toBodilessEntity()
        .flatMap(response -> {
          if (response.getStatusCode().is2xxSuccessful()) {
            log.info("JWT 검증을 성공적으로 완료하였습니다. 요청을 라우팅합니다.");
            return chain.filter(exchange);
          } else {
            log.info("JWT 검증에 실패하였습니다.");
            return unauthorized(exchange);
          }
        })
        .onErrorResume(e -> {
          log.info("{}(으)로 JWT 검증을 요청하던 중 문제가 발생하였습니다. {}", validationUrl, e.getMessage());
          return unauthorized(exchange);
        });
  }

  @Override
  public int getOrder() {
    return -1; // 최상위 순서
  }
}
