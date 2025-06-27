package com.iuha.api.repository;

import com.iuha.api.entity.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepositoryCustom {
    Page<UserDto> getUsers(String id, Pageable pageable);
    Integer existsByEmail(@Param("email") String username);
}
