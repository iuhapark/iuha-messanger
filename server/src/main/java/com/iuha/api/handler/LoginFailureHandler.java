package com.iuha.api.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
public class LoginFailureHandler implements AuthenticationFailureHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception
    ) throws IOException, ServletException {
        String message = exception.getMessage();
        log.error("Sign in failed: {}", message);

        // 응답 상태 코드 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // JSON 응답 작성
        response.setContentType("application/json;charset=UTF-8");

        // 에러 메시지 작성
        Map<String, Object> errorResponse = Map.of(
                "code", 401,
                "type", "LOGIN_FAILED",
                "message", message
        );

        // 응답 본문에 에러 메시지 작성
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
