package com.iuha.api.repository.impl;

import com.iuha.api.entity.model.*;
import com.iuha.api.repository.ChatRoomRepositoryCustom;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepositoryImpl implements ChatRoomRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ChatRoom> findChatRoomsByUserId(String userId) {
        QChatRoom chatRoom = QChatRoom.chatRoom;
        QUserRoom userRoom = QUserRoom.userRoom;
        QUser user = QUser.user;

        return queryFactory
                .selectDistinct(chatRoom)
                .from(chatRoom)
                .join(chatRoom.participants, userRoom).fetchJoin()
                .join(userRoom.user, user).fetchJoin()
                .where(chatRoom.id.in(
                        JPAExpressions
                                .select(userRoom.chatRoom.id)
                                .from(userRoom)
                                .where(userRoom.user.id.eq(userId))
                ))
                .fetch();
    }

}
