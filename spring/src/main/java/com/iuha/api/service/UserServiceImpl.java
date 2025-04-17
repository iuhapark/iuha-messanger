package com.iuha.api.service;

import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;
import com.iuha.api.entity.vo.Role;
import com.iuha.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Transactional
    @Override
    public SessionUser login(UserDto dto) {
        log.info("login 진입 성공 email: {}", dto.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            boolean flag = user.getPassword().equals(dto.getPassword());
            if (flag){
                return new SessionUser(User.builder()
                        .id(user.getId().toString())
                        .email(user.getEmail())
                        .name(user.getName())
                        .role(Role.USER)
                        .build());
            } else {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }
        } else{
            throw new IllegalArgumentException("해당 유저가 존재하지 않습니다.");
        }
    }

    @Override
    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
}
