package com.iuha.api.controller;

import com.iuha.api.config.auth.LoginUser;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    /** 사용자 목록 조회 */
    @GetMapping("/user-list")
    public ResponseEntity<Page<UserDto>> getUsers(
            @LoginUser SessionUser user,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "9") int size) throws Exception {
        log.info("유저 목록 조회: {}", user);
        if (user == null) throw new Exception("Session has expired.");
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(userService.getUsers(user.getId(), pageable));
    }

    /** 회원가입 */
    @PostMapping("/save")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    /** ID로 사용자 조회 */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable("id") String id) {
        log.info("유저 findById: {}", id);
        return ResponseEntity.ok(userService.findById(id));
    }

    /** 이름으로 사용자 조회 */
//    @GetMapping("/{name}")
//    public ResponseEntity<List<User>> findByName(@PathVariable("name") String name) {
//        log.info("유저 findByName: {}", name);
//        List<User> users = userRepository.findByName(name);
//        if (users.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(users);
//    }

}
