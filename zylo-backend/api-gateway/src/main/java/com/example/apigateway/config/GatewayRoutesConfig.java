package com.example.apigateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

  @Value("${zylo.endpoints.integrated-services.uri}")
  private String integratedServiceUri;

  @Bean
  public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("integrated-services", r -> r
            .path("/v1/login")
            .filters(f -> f.rewritePath("/v1/login", "/auth/login"))
            .uri(integratedServiceUri)
        )
        .route("integrated-services/user/all", r -> r
            .path("/v1/user/all")
            .filters(f -> f.rewritePath("/v1/user/all", "/user/all"))
            .uri(integratedServiceUri))
        .build();
  }
}
