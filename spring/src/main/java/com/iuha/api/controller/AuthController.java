package com.iuha.api.controller;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {

    private final HttpSession httpSession;
    private final UserService service;

    @GetMapping("/user")
    public SessionUser user(@LoginUser SessionUser user) {
        log.info("세션에서 꺼낸 유저: {}", user);
        return user;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<SessionUser> login(@RequestBody UserDto dto) throws SQLException {
        return ResponseEntity.ok(service.login(dto));
    }
}
