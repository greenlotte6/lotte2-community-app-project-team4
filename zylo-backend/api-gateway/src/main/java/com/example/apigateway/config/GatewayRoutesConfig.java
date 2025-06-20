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

  @Value("${zylo.endpoints.integrated-services.path.project.team}")
  private String projectTeamPath;

  @Value("${zylo.endpoints.integrated-services.path.project.task}")
  private String projectTaskPath;

  @Value("${zylo.endpoints.integrated-services.path.project.task-detail}")
  private String projectTaskDetailPath;

  @Value("${zylo.endpoints.drive-service.uri}")
  private String driveServiceUri;

  @Value("${zylo.endpoints.drive-service.path.upload}")
  private String uploadPath;

  @Value("${zylo.endpoints.drive-service.path.list}")
  private String listPath;

  @Value("${zylo.endpoints.drive-service.path.download}")
  private String downloadPath;

  @Value("${zylo.endpoints.chat-service.uri}")
  private String chatServiceUri;

  @Value("${zylo.endpoints.chat-service.path.friends}")
  private String friendsPath;

  @Value("${zylo.endpoints.chat-service.path.create}")
  private String createPath;

  @Value("${zylo.endpoints.chat-service.path.messages}")
  private String chatMessagesPath;

  @Value("${zylo.endpoints.chat-service.path.friend}")
  private String friendPath;


  @Bean
  public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("integrated-services/signup", r -> r
            .path("/v1/signup")
            .filters(f -> f.rewritePath("/v1/signup", signupPath))
            .uri(integratedServiceUri))
        .route("integrated-services/login", r -> r
            .path("/v1/login")
            .filters(f -> f.rewritePath("/v1/login", loginPath))
            .uri(integratedServiceUri))
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
            .uri(integratedServiceUri))
        .route("integrated-services/project", r -> r
            .path("/v1/project")
            .filters(f -> f.rewritePath("/v1/project", projectListPath))
            .uri(integratedServiceUri))
        .route("integrated-services/project/team", r -> r
                .path("/v1/project/team")
                .filters(f -> f.rewritePath("/v1/project/team", projectTeamPath))
                .uri(integratedServiceUri))
        .route("integrated-services/project/task-with-id", r -> r // "task-no-id"에서 "task-with-id"로 변경 제안
                .path("/v1/project/task/{segment}") // /v1/project/task/123 과 같은 경로 매칭
                .filters(f -> f.rewritePath("/v1/project/task/(?<segment>.*)", projectTaskPath + "/${segment}")) // <--- 여기를 projectTaskPath로 변경!
                .uri(integratedServiceUri))
        .route("integrated-services/project/task-base", r -> r // "integrated-services/project/task"에서 "task-base"로 변경 제안
                .path("/v1/project/task") // 정확히 이 경로만 매칭
                .filters(f -> f.rewritePath("/v1/project/task", projectTaskPath)) // 백엔드에는 /project/task 로 전달
                .uri(integratedServiceUri))
        .route("drive-service/upload", r -> r
            .path("/v1/drive/upload")
            .filters(f -> f.rewritePath("/v1/drive/upload", uploadPath))
            .uri(driveServiceUri))
        .route("drive-service/list", r -> r
            .path("/v1/drive/list")
            .filters(f -> f.rewritePath("/v1/drive/list", listPath))
            .uri(driveServiceUri))
        .route("drive-service/download", r -> r
            .path("/v1/drive/download")
            .filters(f -> f.rewritePath("/v1/drive/download", downloadPath))
            .uri(driveServiceUri))
        .route("chat-service/channel-friends", r -> r
            .path("/v1/chat/channel/friends")
            .filters(f -> f.rewritePath("/v1/chat/channel/friends", friendsPath))
            .uri(chatServiceUri))
        .route("chat-service/channel-list", r -> r
            .path("/v1/chat/channel/list")
            .filters(f -> f.rewritePath("/v1/chat/channel/list", listPath))
            .uri(chatServiceUri))
        .route("chat-service/channel-create", r -> r
            .path("/v1/chat/channel/create")
            .filters(f -> f.rewritePath("/v1/chat/channel/create", createPath))
            .uri(chatServiceUri))
        .route("chat-service/chat-messages", r -> r
                .path("/v1/chat/messages")
                .filters(f -> f.rewritePath("/v1/chat/messages", chatMessagesPath))
                .uri(chatServiceUri))
        .route("chat-service/friend", r -> r
                .path("/v1/chat/friend")
                .filters(f -> f.rewritePath("/v1/chat/friend", friendPath))
                .uri(chatServiceUri))
            .build();
  }
}
