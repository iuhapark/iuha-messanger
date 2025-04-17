package com.iuha.api.repository.impl;

import com.iuha.api.entity.model.ChatRoom;
import com.iuha.api.entity.model.QChatMessage;
import com.iuha.api.entity.model.QChatRoom;
import com.iuha.api.entity.model.QUser;
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
        QUser sender = QUser.user;
        QUser receiver = new QUser("receiver");
        QChatMessage message = QChatMessage.chatMessage;

        return queryFactory
                .selectFrom(chatRoom)
                .join(chatRoom.sender, sender).fetchJoin()
                .join(chatRoom.receiver, receiver).fetchJoin()
                .leftJoin(chatRoom.chatMessages, message).fetchJoin()
                .where(chatRoom.sender.id.eq(userId)
                        .or(chatRoom.receiver.id.eq(userId)))
                .distinct()
                .fetch();
    }

}
