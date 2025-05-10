package com.iuha.api.repository.impl;

import com.iuha.api.entity.model.*;
import com.iuha.api.repository.ChatRoomRepositoryCustom;
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

        return queryFactory
                .select(userRoom)
                .from(userRoom)
                .join(userRoom.chatRoom, chatRoom).fetchJoin()
                .where(userRoom.user.id.eq(userId))
                .distinct()
                .fetch()
                .stream()
                .map(UserRoom::getChatRoom)
                .toList();
    }

}
