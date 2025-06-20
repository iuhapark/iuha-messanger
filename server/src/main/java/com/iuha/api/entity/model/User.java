package com.iuha.api.entity.model;

import com.iuha.api.entity.vo.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity(name = "users")
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

    /* 친구 목록 */
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserFriend> friends = new ArrayList<>();

    /* 채팅방 참여 목록 */
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserRoom> userRooms = new ArrayList<>();

    public User update(String name, String profile) {
        this.name = name;
        this.profile = profile;
        return this;
    }

    public String getRoleKey() {
        return this.role != null ? this.role.getKey() : "ROLE_USER";
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.role != null
                ? List.of(new SimpleGrantedAuthority(this.getRoleKey()))
                : List.of();
    }
}

