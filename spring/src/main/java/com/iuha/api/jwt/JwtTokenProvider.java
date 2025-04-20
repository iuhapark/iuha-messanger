package com.iuha.api.jwt;

import com.iuha.api.entity.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.expired.access}")
    private long accessTokenExpirySeconds;

    @Value("${jwt.expired.refresh}")
    private long refreshTokenExpirySeconds;

    private SecretKey signingKey;

    @PostConstruct
    public void init() {
        this.signingKey = Keys.hmacShaKeyFor(
                Base64.getEncoder().encode(secretKey.getBytes())
        );
    }

    /** AccessToken만 생성 */
    public String createAccessToken(User user) {
        return buildToken(user, false);
    }

    /** RefreshToken 생성 + Redis 저장 */
    public String createRefreshToken(User user) {
        String refreshToken = buildToken(user, true);
        redisTemplate.opsForValue().set(
                user.getEmail(),
                refreshToken,
                Duration.ofSeconds(refreshTokenExpirySeconds)
        );
        return refreshToken;
    }

    /** JWT 생성 공통 메서드 */
    private String buildToken(User user, boolean isRefresh) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + (isRefresh ? refreshTokenExpirySeconds : accessTokenExpirySeconds) * 1000L);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .claim("roles", List.of(user.getRole().name()))
                .claim("type", isRefresh ? "refresh" : "access")
                .setIssuer(issuer)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    /** JWT에서 Claims 추출 */
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /** 토큰 유효성 검증 */
    public boolean isTokenValid(String token, boolean isRefresh) {
        try {
            Claims claims = getClaims(token);
            return !claims.getExpiration().before(new Date()) &&
                    claims.get("type", String.class).equals(isRefresh ? "refresh" : "access");
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /** Redis에 저장된 refreshToken과 비교 */
    public boolean isRefreshTokenValid(String email, String token) {
        String saved = redisTemplate.opsForValue().get(email);
        return token.equals(saved);
    }

    public void removeRefreshToken(String email) {
        redisTemplate.delete(email);
    }

    public String getEmailFromToken(String token) {
        return getClaims(token).getSubject();
    }

    public String getRoleFromToken(String token) {
        List<?> roles = getClaims(token).get("roles", List.class);
        return roles.isEmpty() ? null : roles.get(0).toString();
    }

    /** 토큰에서 사용자 ID 추출 */
    public String getUserIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token.replace("Bearer ", ""))
                .getBody()
                .get("id", String.class);
    }

}

