package com.iuha.api.entity.model;

import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.vo.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity(name = "users")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
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

    public void updateFromDto(UserDto dto, PasswordEncoder encoder) {
        if (dto.getUsername() != null) this.username = dto.getUsername();
        if (dto.getEmail() != null) this.email = dto.getEmail();
        if (dto.getName() != null) this.name = dto.getName();
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            this.password = encoder.encode(dto.getPassword());
        }
        if (dto.getProfile() != null) this.profile = dto.getProfile();
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

