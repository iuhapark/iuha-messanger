package com.iuha.api.controller;

import com.iuha.api.component.Messenger;
import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.service.UserService;
import com.iuha.api.util.exception.ExceptionUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
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

    @SuppressWarnings("static-access")
    @PostMapping("/save")
    public ResponseEntity<Messenger> save(@RequestBody UserDto dto) throws SQLException {
        log.info("user save 파라미터: {}", dto);
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping("/user")
    public SessionUser user(@LoginUser SessionUser user)  {
        if (user == null) {
            throw new ExceptionUtil.UnauthorizedException("세션이 만료되었습니다. 로그인이 필요합니다.");
        }
        log.info("세션에서 꺼낸 유저: {}", user.getEmail());
        return user;
    }

    /** 로컬 로그인 */
//    @PostMapping(path = "/local/login")
//    public ResponseEntity<SessionUser> login(@RequestBody UserDto dto,
//                                             HttpServletResponse response,
//                                             HttpSession session) {
//        log.info("user login 파라미터: {} ", dto);
//        return ResponseEntity.ok(service.login(dto, response, session));
//    }

    /** OAuth 2.0 로그인 */
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
