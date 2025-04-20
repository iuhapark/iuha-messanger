package com.iuha.api.controller;

import com.iuha.api.entity.model.User;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token")
public class AuthController {

    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate redisTemplate;
    private final UserRepository userRepository;

    /**
     * Authorization 헤더에 담긴 RefreshToken을 기반으로 유저 정보 반환
     */
    @GetMapping("/user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String token) {
        String refreshToken = token.replace("Bearer ", "");

        if (!jwtTokenProvider.isTokenValid(refreshToken, true)) {
            return ResponseEntity.status(401).body("Invalid or expired refresh token.");
        }

        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        String redisToken = redisTemplate.opsForValue().get(email);

        if (redisToken == null || !redisToken.equals(refreshToken)) {
            return ResponseEntity.status(401).body("Token not found in Redis.");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
