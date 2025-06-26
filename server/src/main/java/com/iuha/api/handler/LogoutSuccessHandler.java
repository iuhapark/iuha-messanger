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
        // Referer 체크 (CSRF 방지)
        String referer = request.getHeader("Referer");
        if (referer == null || !referer.contains("iuhapark.com") || !referer.contains("localhost")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid logout request");
            return;
        }

        // 세션 삭제
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
//        response.sendRedirect("http://localhost:3000"); // dev env
         response.sendRedirect("https://www.iuhapark.com"); // prod env

        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"logout complete\"}");
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
