package com.iuha.api.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "spring.mail")
public class MailProperties {
    private String host;	 // mail.host
    private int port;		 // mail.port
    private String username; // mail.username
    private String password; // mail.password

    private Smtp smtp;
    private Jwt jwt;

    @Getter
    @Setter
    public static class Smtp {
        private boolean auth;	// mail.smtp.auth
        private boolean enable; // mail.smtp.enable
        private int timeout;	// mail.smtp.timeout
        private int expired;	// mail.smtp.expired
    }

    @Getter
    @Setter
    public static class Jwt {
        private String sign;
        private String token;
    }

    /* 로그인 사용자가 ADMIN 유저인지 확인 */
    public boolean isAdmin(String email) {
        return email.equals(username);
    }

}
