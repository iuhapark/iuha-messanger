package com.iuha.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class IuhaApplication {

    public static void main(String[] args) {
        SpringApplication.run(IuhaApplication.class, args);
    }

}
