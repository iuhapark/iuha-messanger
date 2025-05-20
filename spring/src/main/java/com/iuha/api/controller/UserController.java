package com.iuha.api.controller;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> getUsers(@LoginUser SessionUser user) throws Exception {
        log.info("유저 특정 필드만 조회");
        if (user == null) throw new Exception("세션이 만료되었습니다.");
        return ResponseEntity.ok(userService.getUsers(user.getId()));
    }

    @PostMapping("/save")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable("id") String id) {
        log.info("유저 findById: {}", id);
        return ResponseEntity.ok(userService.findById(id));
    }
}
