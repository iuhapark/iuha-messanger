package com.iuha.api.repository.impl;

import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.QUser;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.UserRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<UserDto> getUsers() {
        QUser user = QUser.user;

        return queryFactory
                .select(user)
                .from(user)
                .fetch()
                .stream()
                .map(u -> UserDto.builder()
                        .id(u.getId())
                        .name(u.getName())
                        .profile(u.getProfile())
                        .build())
                .toList();
    }
}
