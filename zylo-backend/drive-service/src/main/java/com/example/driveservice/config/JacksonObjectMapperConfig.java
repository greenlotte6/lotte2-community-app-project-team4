package com.example.driveservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(Jackson2ObjectMapperBuilder.class)
public class JacksonObjectMapperConfig {

  @Bean
  @Primary
  @ConditionalOnMissingBean
  ObjectMapper jacksonObjectmapper(Jackson2ObjectMapperBuilder builder) {
    return builder.createXmlMapper(false).build();
  }
}
