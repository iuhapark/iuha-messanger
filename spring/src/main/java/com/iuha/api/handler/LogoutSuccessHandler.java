package com.iuha.api.handler;

import com.iuha.api.jwt.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class LogoutSuccessHandler implements org.springframework.security.web.authentication.logout.LogoutSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate redisTemplate;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();

        // 쿠키 삭제
        deleteCookie("JSESSIONID", response);
        deleteCookie("accessToken", response);
        deleteCookie("refreshToken", response);

        // Redis에서 refreshToken 삭제
        String refreshToken = getCookieValue(request, "refreshToken");
        if (refreshToken != null && jwtTokenProvider.isTokenValid(refreshToken, true)) {
            String email = jwtTokenProvider.getEmailFromToken(refreshToken);
            redisTemplate.delete(email);
        }

        // 리디렉션
        response.sendRedirect("http://localhost:3000");
    }

    private void deleteCookie(String name, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private String getCookieValue(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals(name)) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
