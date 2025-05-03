package com.iuha.api.controller;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.service.UserService;
import com.iuha.api.util.exception.ExceptionUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserService service;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/user")
    public SessionUser user(@LoginUser SessionUser user)  {
        if (user == null) {
            throw new ExceptionUtil.UnauthorizedException("세션이 만료되었습니다. 로그인이 필요합니다.");
        }
        log.info("세션에서 꺼낸 유저: {}", user.getEmail());
        return user;
    }

    /** 로컬 로그인 */
    @PostMapping(path = "/login")
    public ResponseEntity<SessionUser> login(@RequestBody UserDto dto) throws SQLException {
        return ResponseEntity.ok(service.login(dto));
    }

    /** OAuth 2.0 로그임 */
    @PostMapping("/oauth2/{registration}")
    public ResponseEntity<UserDto> oauthLogin(@RequestBody UserDto dto) {
        log.info("user oauth2 파라미터: {} ", dto);
        return ResponseEntity.ok(service.oauthJoin(dto));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        service.logout(request, response);
        return ResponseEntity.ok("logout complete");
    }
}
