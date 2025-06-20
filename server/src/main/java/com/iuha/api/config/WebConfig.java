package com.iuha.api.config;

import com.iuha.api.config.auth.LoginUserArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final LoginUserArgumentResolver loginUserArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginUserArgumentResolver);
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/api/**") // CORS를 적용할 URL 패턴
        registry.addMapping("**")
                .allowedOrigins("http://localhost:3000", "https://www.iuhapark.com")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                .allowedHeaders("*")
                .allowedMethods("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true);

    }

}
