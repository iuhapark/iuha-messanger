package com.iuha.api.util.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ExceptionUtil {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<?> handleException(AppException ex) {
        log.warn("[AppException] {}", ex.getMessage());
        return ResponseEntity.status(ex.getStatus())
                .body(Map.of(
                        "code", ex.getStatus().value(),
                        "type", ex.getType(),
                        "message", ex.getMessage()
                ));
    }

    @Getter
    @RequiredArgsConstructor
    public static class AppException extends RuntimeException {
        private final HttpStatus status;
        private final String type;
        private final String message;
    }

    public static class UnauthorizedException extends AppException {
        public UnauthorizedException(String message) {
            super(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", message);
        }
    }

    public static class BadRequestException extends AppException {
        public BadRequestException(String message) {
            super(HttpStatus.BAD_REQUEST, "BAD_REQUEST", message);
        }
    }

    public static class ServerErrorException extends AppException {
        public ServerErrorException(String message) {
            super(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR", message);
        }
    }
}