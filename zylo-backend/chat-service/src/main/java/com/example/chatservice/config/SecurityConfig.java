package com.example.chatservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(request -> request
                        // WebSocket 엔드포인트와 SockJS info 요청에 대한 접근을 허용합니다.
                        .requestMatchers("/ws/**", "/ws/info").permitAll() // <-- 이 라인이 중요!
                        .anyRequest().permitAll() // 나머지 모든 요청도 일단 허용 (개발 중에는 이렇게 해도 무방)
                )
                .sessionManagement(
                        (session) -> {
                            session.sessionFixation()
                                    .changeSessionId()
                                    .maximumSessions(1)
                                    .maxSessionsPreventsLogin(true);
                        })
                .csrf(AbstractHttpConfigurer::disable)
                // HTTP Basic 인증 팝업을 비활성화합니다.
                .httpBasic(AbstractHttpConfigurer::disable); // <-- 이 라인을 추가하세요!
        // .formLogin().disable(); // 만약 formLogin도 기본으로 활성화되어 있다면 이것도 추가

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Security 암호화 인코더 설정
        return new BCryptPasswordEncoder();
    }
}
