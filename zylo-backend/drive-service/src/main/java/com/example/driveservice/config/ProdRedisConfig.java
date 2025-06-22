package com.example.driveservice.config;

import io.lettuce.core.ClientOptions;
import io.lettuce.core.SslOptions;
import io.lettuce.core.resource.ClientResources;
import io.lettuce.core.resource.DefaultClientResources;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;

@Configuration
@Profile("prod")
public class ProdRedisConfig {

  @Value("${spring.data.redis.host}")
  private String host;

  @Value("${spring.data.redis.port}")
  private int port;

  @Bean(destroyMethod = "shutdown")
  public ClientResources clientResources() {
    return DefaultClientResources.create();
  }


  @Bean
  public LettuceConnectionFactory redisConnectionFactory(ClientResources clientResources) {
    RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration();
    redisConfig.setHostName(host);
    redisConfig.setPort(6379);

    LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
        .clientOptions(ClientOptions.builder()
            .sslOptions(SslOptions.builder()
                .build())  // 기본 Java TrustStore 사용
            .build())
        .clientResources(clientResources)
        .commandTimeout(Duration.ofSeconds(5))
        .useSsl()
        .build();

    return new LettuceConnectionFactory(redisConfig, clientConfig);
  }
}
