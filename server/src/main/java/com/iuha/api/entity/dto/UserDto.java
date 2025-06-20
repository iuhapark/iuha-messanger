package com.iuha.api.entity.dto;

import com.iuha.api.entity.model.User;
import com.iuha.api.entity.vo.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Setter
public class UserDto {
    private String id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String profile;
    private Role role;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.name = user.getName();
        this.profile = user.getProfile();
        this.role = user.getRole();
    }

    public static UserDto from(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
                .profile(user.getProfile())
                .build();
    }
}
