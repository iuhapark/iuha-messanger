package com.iuha.api.repository.impl;

import com.iuha.api.entity.model.Message;
import com.iuha.api.entity.model.QMessage;
import com.iuha.api.entity.model.QUser;
import com.iuha.api.repository.MessageRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MessageRepositoryImpl implements MessageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Message> findMessagesWithSenderByRoomId(String roomId) {
        QMessage message = QMessage.message1;
        QUser user = QUser.user;

        return queryFactory
                .selectFrom(message)
                .join(message.sender, user).fetchJoin()
                .where(message.chatRoom.id.eq(roomId))
                .orderBy(message.timestamp.asc())
                .fetch();
    }
}
