package com.iuha.api.util.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ExceptionUtil {

    /* 400 에러 처리 */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handle400(IllegalArgumentException ex) {
        log.warn("Bad Request: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "code", HttpStatus.BAD_REQUEST.value(),
                        "type", "BAD_REQUEST",
                        "message", ex.getMessage()
                ));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public static class BadRequestException extends RuntimeException {
        public BadRequestException(String message) {
            super(message);
        }
    }

    /* 405 에러 처리 */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<?> handle405(IllegalStateException ex) {
        log.warn("Method Not Allowed: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(Map.of(
                        "code", HttpStatus.METHOD_NOT_ALLOWED.value(),
                        "type", "METHOD_NOT_ALLOWED",
                        "message", ex.getMessage()
                ));
    }

    /* 401 에러 처리 */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<?> handle401(UnauthorizedException ex) {
        log.warn("Unauthorized: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "code", HttpStatus.UNAUTHORIZED.value(),
                        "type", "UNAUTHORIZED",
                        "message", ex.getMessage()
                ));
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException(String message) {
            super(message);
        }
    }

    /* 500 에러 처리 */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handle500(Exception ex) {
        log.error("서버 오류 발생", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                        "code", HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "type", "INTERNAL_SERVER_ERROR",
                        "message", "서버 오류가 발생했습니다."
                ));
    }

}
