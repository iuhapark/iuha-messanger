package com.iuha.api.config;

import com.iuha.api.handler.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import com.iuha.api.entity.vo.Role;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf((csrfConfig) -> csrfConfig.disable())
                .cors(Customizer.withDefaults())
                .headers((headerConfig) -> headerConfig.frameOptions(
                                frameOptionsConfig -> frameOptionsConfig.disable()))
                .authorizeHttpRequests((authorizeRequest) -> authorizeRequest
                        .requestMatchers("/api/chat/my", "/api/chat/all", "/api/chat/new", "/api/chat/save", "/api/chat/rooms").authenticated()

                        .requestMatchers("/", "/css/**", "images/**", "/js/**", "/login/*", "/logout/*").permitAll()
                        .anyRequest().authenticated())
                // 로그아웃 성공 시 / 주소로 이동
                .logout((logoutConfig) -> logoutConfig.logoutSuccessUrl("http://localhost:3000/"))
                // OAuth2 로그인 기능에 대한 여러 설정
//                .oauth2Login(Customizer.withDefaults()); // 아래 코드와 동일한 결과
                .oauth2Login((oauth) -> oauth.userInfoEndpoint((endpoint) -> endpoint.userService(customOAuth2UserService))
                        .successHandler(oAuth2LoginSuccessHandler));

        return http.build();
    }
}
