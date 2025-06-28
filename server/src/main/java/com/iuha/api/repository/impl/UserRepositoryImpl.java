package com.iuha.api.repository.impl;

import com.iuha.api.entity.dto.UserDto;
import com.iuha.api.entity.model.QUser;
import com.iuha.api.entity.model.User;
import com.iuha.api.repository.UserRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    QUser user = QUser.user;

    @Override
    public Page<UserDto> getUsers(String id, Pageable pageable) {
        List<UserDto> userDtos = queryFactory
                .select(user)
                .from(user)
                .where(user.id.ne(id)) // 로그인한 사용자의 ID를 제외
                .orderBy(user.name.asc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch()
                .stream()
                .map(u -> UserDto.builder()
                        .id(u.getId())
                        .username(u.getUsername())
                        .name(u.getName())
                        .profile(u.getProfile())
                        .build())
                //OrderBy user.name.asc()
                .toList();

        long total = queryFactory
                .select(user.count())
                .from(user)
                .where(user.id.ne(id))
                .fetchOne();

        return new PageImpl<>(userDtos, pageable, total);
    }

    @Override
    public Integer existsByEmail(String username) {
        Long result = queryFactory
                .select(user.count())
                .from(user)
                .where(user.email.eq(username))
                .fetchOne();

        return result != null ? result.intValue() : 0;
    }

}
