package com.iuha.api.service.impl;

import com.iuha.api.component.Messenger;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;
import com.iuha.api.entity.vo.Role;
import com.iuha.api.jwt.JwtTokenProvider;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    @Override
    public Messenger save(UserDto dto) {
        log.info("service 진입 파라미터: {} ", dto);
        dto.setRole(Role.USER);
        log.info("Role: {}", dto.getRole());
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = dtoToEntity(dto);
        User savedUser = userRepository.save(user);
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
            User existOauthUpdate = userRepository.findByEmail(dto.getEmail())
                    .stream()
                    .findFirst()
                    .get();
            return UserDto.builder()
                            .id(existOauthUpdate.getId())
                            .email(existOauthUpdate.getEmail())
                            .role(Role.USER)
                            .build();
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
    public List<UserDto> getUsers(String id) {
        return userRepository.getUsers(id);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 세션 제거
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // 2. 쿠키 제거
        deleteCookie("accessToken", response);
        deleteCookie("refreshToken", response);

        // 3. Redis에서 refreshToken 삭제
        String refreshToken = getCookieValue(request, "refreshToken");
        if (refreshToken != null && jwtTokenProvider.isTokenValid(refreshToken, true)) {
            String email = jwtTokenProvider.getEmailFromToken(refreshToken);
            redisTemplate.delete(email);
        }
    }

    private void deleteCookie(String name, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, null);
        cookie.setPath("/");
        cookie.setMaxAge(0); // 즉시 만료
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    private String getCookieValue(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals(name)) {
                return cookie.getValue();
            }
        }
        return null;
    }

}
