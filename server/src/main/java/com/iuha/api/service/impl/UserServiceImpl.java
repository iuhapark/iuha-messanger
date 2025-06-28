package com.iuha.api.service.impl;

import com.iuha.api.component.Messenger;
import com.iuha.api.entity.dto.LoginRequest;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;
import com.iuha.api.entity.vo.Role;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.UserService;
import com.iuha.api.util.exception.ExceptionUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate redisTemplate;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public SessionUser login(LoginRequest req,  HttpServletRequest request, HttpServletResponse response) {
        log.info("login 진입 성공 username: {}", req.getUsername());
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User does not exist with username: " + req.getUsername()));
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new IllegalArgumentException("Invalid password.");
        return new SessionUser(user);
    }

    @Transactional
    @Override
    public Messenger save(UserDto dto) throws SQLException {
        log.info("service 진입 파라미터: {} ", dto);

        userRepository.findByUsername(dto.getUsername()).ifPresent(user -> {
            throw new ExceptionUtil.BadRequestException("Username is already taken.");
        });

        userRepository.findByEmail(dto.getEmail()).ifPresent(user -> {
            throw new ExceptionUtil.BadRequestException("Email is already taken.");
        });

        dto.setRole(Role.USER);
        log.info("Role: {}", dto.getRole());
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = dtoToEntity(dto);
        User savedUser = userRepository.save(user);
        log.info("저장된 유저 정보: {}", savedUser);
        if (savedUser == null) throw new ExceptionUtil.ServerErrorException("Registration failed. Please try again.");

        return Messenger.builder()
                .message(userRepository.existsById(savedUser.getId()) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public UserDto oauthJoin(UserDto dto) {
        User oauthUser = User.builder()
                .email(dto.getEmail())
                .name(dto.getName())
                .profile(dto.getProfile())
                .build();
        if (userRepository.existsByEmail(oauthUser.getEmail()) > 0) {
            return userRepository.findByEmail(dto.getEmail())
                    .map(entity -> UserDto.builder()
                            .id(entity.getId())
                            .email(entity.getEmail())
                            .role(Role.USER)
                            .build())
                    .orElseThrow(() -> new RuntimeException("Could not find user with email: " + dto.getEmail()));
        } else {
            var newOauthSave = userRepository.save(oauthUser);
            return UserDto.builder()
                    .id(newOauthSave.getId())
                    .email(newOauthSave.getEmail())
                    .role(Role.NEWUSER)
                    .build();
        }
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public Page<UserDto> getUsers(String id, Pageable pageable) {
        return userRepository.getUsers(id, pageable);
    }

    @Transactional
    @Override
    public Messenger update(UserDto dto) {
        Optional<User> optionalUser = userRepository.findById(dto.getId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            User modifyUser = user.toBuilder()
                    .username(dto.getUsername())
                    .email(dto.getEmail())
                    .name(dto.getName())
                    .password(passwordEncoder.encode(dto.getPassword()))
                    .profile(dto.getProfile())
                    .build();
            String userId = userRepository.save(modifyUser).getId();

            return Messenger.builder()
                    .message("SUCCESS ID is " + userId)
                    .build();
        } else {
            return Messenger.builder()
                    .message("FAILURE")
                    .build();
        }
    }

}
