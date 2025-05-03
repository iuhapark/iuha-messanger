package com.iuha.api.entity.dto;

import com.iuha.api.entity.model.User;
import com.iuha.api.entity.vo.Role;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

    private String id;
    private String name;
    private String email;
    private String profile;
    private Role role;

    public SessionUser(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.profile = user.getProfile();
        this.role = user.getRole();
    }
}
