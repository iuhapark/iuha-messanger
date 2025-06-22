package com.iuha.api;

import com.iuha.api.properties.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableEurekaServer
@EnableScheduling
@EnableConfigurationProperties(JwtProperties.class)
@SpringBootApplication
public class IuhaApplication {

    public static void main(String[] args) {
        SpringApplication.run(IuhaApplication.class, args);
    }

}
