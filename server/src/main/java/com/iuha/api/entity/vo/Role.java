package com.iuha.api.entity.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    ADMIN("ROLE_ADMIN", "관리자"),
    USER("ROLE_USER", "사용자"),
    NEWUSER("ROLE_NEWUSER", "신규 사용자");

    private final String key;
    private final String title;
}
