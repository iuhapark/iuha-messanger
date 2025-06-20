package com.iuha.api.repository;

import com.iuha.api.entity.dto.UserDto;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepositoryCustom {
    List<UserDto> getUsers(String id);
    Integer existsByEmail(@Param("email") String username);
}
