package com.iuha.api.entity.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Map;

@Getter
@NoArgsConstructor
@Component
@Setter
public class PrincipalUserDetails implements Serializable {
    private User user;
    private Map<String, Object> attributes;

    public PrincipalUserDetails(User user) {
        this.user = user;
    }

    public PrincipalUserDetails(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }
}
