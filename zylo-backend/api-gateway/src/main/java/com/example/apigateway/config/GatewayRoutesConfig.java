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

  @Value("${zylo.endpoints.integrated-services.path.auth.signup}")
  private String signupPath;

  @Value("${zylo.endpoints.integrated-services.path.auth.login}")
  private String loginPath;

  @Value("${zylo.endpoints.integrated-services.path.query.user-all}")
  private String userAllPath;

  @Value("${zylo.endpoints.integrated-services.path.query.user}")
  private String userPath;

  @Value("${zylo.endpoints.integrated-services.path.health-check}")
  private String healthCheckPath;

  @Value("${zylo.endpoints.integrated-services.path.project.list}")
  private String projectListPath;

  @Value("${zylo.endpoints.drive-service.uri}")
  private String driveServiceUri;

  @Value("${zylo.endpoints.drive-service.path.upload}")
  private String uploadPath;

  @Value("${zylo.endpoints.drive-service.path.list}")
  private String listPath;

  @Value("${zylo.endpoints.drive-service.path.download}")
  private String downloadPath;

  @Bean
  public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("integrated-services/signup", r -> r
            .path("/v1/signup")
            .filters(f -> f.rewritePath("/v1/signup", signupPath))
            .uri(integratedServiceUri)
        )
        .route("integrated-services/login", r -> r
            .path("/v1/login")
            .filters(f -> f.rewritePath("/v1/login", loginPath))
            .uri(integratedServiceUri)
        )
        .route("integrated-services/user/all", r -> r
            .path("/v1/user/all")
            .filters(f -> f.rewritePath("/v1/user/all", userAllPath))
            .uri(integratedServiceUri))
        .route("integrated-services/user", r -> r
            .path("/v1/user")
            .filters(f -> f.rewritePath("/v1/user", userPath))
            .uri(integratedServiceUri))
        .route("integrated-services/healthcheck", r -> r
            .path("/v1/integrated/health")
            .filters(f -> f.rewritePath("/v1/integrated/health", healthCheckPath))
            .uri(integratedServiceUri)
        )
        .route("integrated-services/project", r -> r
            .path("/v1/project/list")
            .filters(f -> f.rewritePath("/v1/project/list", projectListPath))
            .uri(integratedServiceUri)
        )
        .route("drive-service/upload", r -> r
            .path("/v1/drive/upload")
            .filters(f -> f.rewritePath("/v1/drive/upload", uploadPath))
            .uri(driveServiceUri)
        )
        .route("drive-service/list", r -> r
            .path("/v1/drive/list")
            .filters(f -> f.rewritePath("/v1/drive/list", listPath))
            .uri(driveServiceUri)
        )
        .route("drive-service/download", r -> r
            .path("/v1/drive/download")
            .filters(f -> f.rewritePath("/v1/drive/download", downloadPath))
            .uri(driveServiceUri))
        .build();
  }
}
