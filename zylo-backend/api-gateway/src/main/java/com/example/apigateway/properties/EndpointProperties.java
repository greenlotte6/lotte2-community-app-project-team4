package com.example.apigateway.properties;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "zylo.endpoints")
@Getter
@Setter
public class EndpointProperties {

  private List<String> excludedPaths;
}