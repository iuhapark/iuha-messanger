package com.iuha.api.config;

import com.iuha.api.handler.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:3000", "https://www.iuhapark.com"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setExposedHeaders(List.of("Authorization"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/chat/**", "/api/token/user").authenticated()
                        .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/login/**", "/logout/**").permitAll()
                        .anyRequest().authenticated())
                // 로그아웃 성공 시 / 주소로 이동
                .logout((logoutConfig) -> logoutConfig.logoutSuccessUrl("http://localhost:3000/"))
                // OAuth2 로그인 기능에 대한 여러 설정
                .oauth2Login((oauth) -> oauth
                        .userInfoEndpoint((endpoint) -> endpoint.userService(customOAuth2UserService))
                        .successHandler(oAuth2LoginSuccessHandler));
        return http.build();
    }
}
