package com.iuha.api.jwt;

import com.iuha.api.entity.model.User;
import com.iuha.api.properties.JwtProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final JwtProperties jwtProperties;

    private SecretKey signingKey;
    private String issuer;
    private long accessTokenExpirySeconds;
    private long refreshTokenExpirySeconds;

    @PostConstruct
    public void init() {
        if (jwtProperties.getExpired() == null)
            throw new IllegalArgumentException("JWT properties are not properly configured.");

        this.issuer = jwtProperties.getIssuer();
        this.accessTokenExpirySeconds = jwtProperties.getExpired().getAccess();
        this.refreshTokenExpirySeconds = jwtProperties.getExpired().getRefresh();
        this.signingKey = Keys.hmacShaKeyFor(Base64.getEncoder().encode(jwtProperties.getSecret().getBytes()));
    }

    /** AccessToken만 생성 */
    public String createAccessToken(User user) {
        return buildToken(user, false);
    }

    /** RefreshToken 생성 + Redis 저장 */
    public String createRefreshToken(User user) {
        String refreshToken = buildToken(user, true);
        redisTemplate.opsForValue().set(user.getEmail(), refreshToken, Duration.ofSeconds(refreshTokenExpirySeconds));
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

    /** 토큰 유효성 검증 */
    public boolean isTokenValid(String token, boolean isRefresh) {
        try {
            Claims claims = getClaims(token);
            String type = claims.get("type", String.class);
            return !claims.getExpiration().before(new Date()) && type.equals(isRefresh ? "refresh" : "access");
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("JWT 검증 실패: {}", e.getMessage());
            return false;
        }
    }

    /** JWT 검증 + Redis에 저장된 refreshToken과 비교 */
    public boolean isRefreshTokenValid(String email, String token) {
        if (!isTokenValid(token, true)) return false;
        String saved = redisTemplate.opsForValue().get(email);
        return token.equals(saved);
    }

    public void removeRefreshToken(String email) {
        redisTemplate.delete(email);
    }

    /** JWT에서 Claims 추출 */
    private Claims getClaims(String token) {
        token = stripBearer(token);
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
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
        return getClaims(token).get("id", String.class);
    }

    public String stripBearer(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }
}