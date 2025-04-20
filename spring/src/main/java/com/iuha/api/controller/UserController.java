package com.iuha.api.controller;

import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final HttpSession httpSession;
    private final UserService userService;

    @GetMapping("/auth")
    public String list(Pageable pageable, Model model) {
        // 세션에서 사용자 정보 꺼내기
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        if (user != null) {
            model.addAttribute("userName", user.getName());
        }
        return "list";
    }

    @GetMapping("/all")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/save")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable("id") Long id) {
        log.info("유저 findById: {}", id);
        return ResponseEntity.ok(userService.findById(id));
    }
}
