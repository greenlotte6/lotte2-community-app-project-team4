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

  @Value("${zylo.endpoints.integrated-services.path.auth.login}")
  private String loginPath;

  @Value("${zylo.endpoints.integrated-services.path.query.user-all}")
  private String userAllPath;

  @Value("${zylo.endpoints.integrated-services.path.health-check}")
  private String healthCheckPath;

  @Value("${zylo.endpoints.drive-service.uri}")
  private String driveServiceUri;

  @Value("${zylo.endpoints.drive-service.path.upload}")
  private String uploadPath;

  @Bean
  public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("integrated-services", r -> r
            .path("/v1/login")
            .filters(f -> f.rewritePath("/v1/login", loginPath))
            .uri(integratedServiceUri)
        )
        .route("integrated-services/user/all", r -> r
            .path("/v1/user/all")
            .filters(f -> f.rewritePath("/v1/user/all", userAllPath))
            .uri(integratedServiceUri))
        .route("integrated-services/healthcheck", r -> r
            .path("/v1/health")
            .filters(f -> f.rewritePath("/v1/health", healthCheckPath))
            .uri(integratedServiceUri)
        )
        .route("drive-service/upload", r -> r
            .path("/v1/drive/upload")
            .filters(f -> f.rewritePath("/v1/drive/upload", uploadPath))
            .uri(driveServiceUri)
        )
        .build();
  }
}
