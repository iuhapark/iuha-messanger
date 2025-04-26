package com.iuha.api.repository;

import com.iuha.api.entity.dto.UserDto;

import java.util.List;

public interface UserRepositoryCustom {
    List<UserDto> getUsers();
}
