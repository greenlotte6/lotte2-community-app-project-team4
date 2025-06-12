package com.example.apigateway.filter.global;

import com.example.apigateway.properties.EndpointProperties;
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

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

  @Value("${zylo.endpoints.integrated-services.uri}")
  private String integratedServices;

  @Value("${zylo.endpoints.integrated-services.path.validation}")
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
    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
    return exchange.getResponse().setComplete();
  }

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    if (isExcludedPath(exchange.getRequest().getPath().value())) { //JWT 인증이 필요없는 URL로의 요청인 경우
      return chain.filter(exchange);
    }

    HttpCookie accessTokenCookie = exchange.getRequest()
        .getCookies()
        .getFirst("access_token");

    if (accessTokenCookie == null) { //Access Token 쿠키가 없는 경우
      return unauthorized(exchange); // Response 401
    }

    return client.get()
        .uri(jwtValidationPath)
        .header(HttpHeaders.COOKIE,
            accessTokenCookie.getName() + "=" + accessTokenCookie.getValue())
        .retrieve()
        .toBodilessEntity()
        .flatMap(response -> {
          if (response.getStatusCode().is2xxSuccessful()) {
            return chain.filter(exchange);
          } else {
            return unauthorized(exchange);
          }
        })
        .onErrorResume(e -> unauthorized(exchange));
  }

  @Override
  public int getOrder() {
    return -1; // 최상위 순서
  }
}
