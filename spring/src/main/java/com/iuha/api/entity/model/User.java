package com.iuha.api.entity.model;

import com.iuha.api.entity.vo.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collection;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String profile;
    @Enumerated(EnumType.STRING)
    private Role role;

    public User update(String name, String profile) {
        this.name = name;
        this.profile = profile;

        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(this.getRoleKey()));
    }

}

