package com.iuha.api.repository;

import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<ChatRoom> findByNameOrderByIdDesc(String roomId);
    Optional<User> findByEmail(String email); // 중복 가입 확인
}
