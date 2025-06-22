package com.iuha.api.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    private String issuer; // jwt.issuer
    private String secret; // jwt.secret
    private Expired expired;

    @Getter
    @Setter
    public static class Expired {
        private long access;	// jwt.expired.access
        private long refresh;	// jwt.expired.refresh
    }
}
