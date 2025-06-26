package com.iuha.api.config;

import com.iuha.api.handler.LoginFailureHandler;
import com.iuha.api.handler.LoginSuccessHandler;
import com.iuha.api.handler.OAuth2SuccessHandler;
import com.iuha.api.handler.LogoutSuccessHandler;
import com.iuha.api.service.impl.CustomOAuth2UserService;
import com.iuha.api.service.impl.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2SuccessHandler OAuth2SuccessHandler;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailureHandler loginFailureHandler;
    private final LogoutSuccessHandler logoutSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder, CustomUserDetailsService userDetailsService) throws Exception {
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        return builder.build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
//                    config.setAllowedOrigins(List.of("http://localhost:3000"));
                    config.setAllowedOrigins(List.of("https://*.iuhapark.com"));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
//                    config.setExposedHeaders(List.of("Authorization"));
                    config.setAllowCredentials(true);
                    return config;
                }))
//                모든 요청을 https로 강제 (localhost에선 꺼두기)
                .requiresChannel(channel ->
                        channel.anyRequest().requiresSecure()
                )
                .formLogin(
//                        form -> form.disable()
                        form -> form
                        .loginProcessingUrl("/login")
                        .successHandler(loginSuccessHandler)
                        .failureHandler(loginFailureHandler)
                        .permitAll()
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/chat/**").authenticated()
                        .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/login/**", "/logout/**", "/api/**").permitAll()
                        .anyRequest().authenticated())
                // 로그아웃 성공 시 / 주소로 이동
                .logout((logoutConfig) -> logoutConfig
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(logoutSuccessHandler)
                        .permitAll())
                // OAuth2 로그인 기능에 대한 여러 설정
                .oauth2Login((oauth) -> oauth
                        .userInfoEndpoint((endpoint) -> endpoint.userService(customOAuth2UserService))
                        .successHandler(OAuth2SuccessHandler));
        return http.build();
    }
}
