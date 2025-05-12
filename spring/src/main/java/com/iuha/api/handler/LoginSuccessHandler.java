package com.iuha.api.handler;

import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.PrincipalUserDetails;
import com.iuha.api.entity.model.User;
import com.iuha.api.jwt.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        PrincipalUserDetails userDetails = (PrincipalUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();
        HttpSession session = request.getSession();
        session.setAttribute("user", new SessionUser(user));

        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        setTokenCookie(response, "accessToken", accessToken, false);
        setTokenCookie(response, "refreshToken", refreshToken, true);

        response.sendRedirect("http://localhost:3000"); // 로그인 후 리디렉션 경로
    }

    private void setTokenCookie(HttpServletResponse response, String name, String token, boolean httpOnly) {
        Cookie cookie = new Cookie(name, token);
        cookie.setPath("/");
        cookie.setHttpOnly(httpOnly);
        cookie.setMaxAge(60 * 60 * 24 * 7);
        response.addCookie(cookie);
    }
}
