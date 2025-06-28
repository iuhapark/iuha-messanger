package com.iuha.api.service;

import com.iuha.api.component.Messenger;
import com.iuha.api.entity.dto.LoginRequest;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

public interface UserService {

    default User dtoToEntity(UserDto dto) {
        return User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword())
                .profile(dto.getProfile())
                .role(dto.getRole())
                .build();
    }

    default UserDto entityToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .name(user.getName())
//                .password(user.getPassword())
                .profile(user.getProfile())
                .role(user.getRole())
                .build();
    }

    UserDto oauthJoin(UserDto dto);
    Messenger save(UserDto dto) throws SQLException;
    SessionUser login(LoginRequest req, HttpServletRequest request, HttpServletResponse response);
    Optional<UserDto> findById(String id);
    Page<UserDto> getUsers(String id, Pageable pageable);
    Messenger update(UserDto dto);
//    List<User> findByName(String name) throws Exception;
}
