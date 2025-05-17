package com.iuha.api.handler;

import com.iuha.api.entity.model.CustomOAuth2User;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.entity.model.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        User user = oAuth2User.getUser();

        // JWT 토큰 발급
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user); // Redis 저장 포함

        // 토큰을 헤더에 담거나 쿠키에 저장
        setTokenCookie(response, "accessToken", accessToken, false);
        setTokenCookie(response, "refreshToken", refreshToken, true);

        // 리디렉션
        response.sendRedirect("http://localhost:3000"); // 프론트 페이지
    }

    private void setTokenCookie(HttpServletResponse response, String name, String token, boolean httpOnly) {
        Cookie cookie = new Cookie(name, token);
        cookie.setPath("/");
        cookie.setHttpOnly(httpOnly);
        response.addCookie(cookie);
    }
}