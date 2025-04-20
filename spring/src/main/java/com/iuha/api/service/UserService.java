package com.iuha.api.service;

import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;

import java.util.Optional;

public interface UserService {

    default User dtoToEntity(UserDto dto) {
        return User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword())
                .profile(dto.getProfile())
                .build();
    }

    default UserDto entityToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
                .password(user.getPassword())
                .profile(user.getProfile())
                .build();
    }

    Optional<User> findById(Long id);
}
