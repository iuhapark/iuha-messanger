package com.iuha.api.repository.impl;

import com.iuha.api.entity.model.*;
import com.iuha.api.repository.ChatRoomRepositoryCustom;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepositoryImpl implements ChatRoomRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    /**
     * 사용자 ID로 채팅방 목록을 조회합니다.
     *
     * @param userId 사용자 ID
     * @return List<ChatRoom> 채팅방 목록
     */
    @Override
    public List<ChatRoom> findChatRoomsByUserId(String userId) {
        QChatRoom chatRoom = QChatRoom.chatRoom;
        QUserRoom userRoom = QUserRoom.userRoom;
        QUser user = QUser.user;
        QMessage message = QMessage.message1;

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
                .orderBy(chatRoom.updatedAt.desc())
                .fetch();
    }

    @Override
    public Optional<ChatRoom> findExistingChatRoom(String senderId, String receiverId) {
        QChatRoom chatRoom = QChatRoom.chatRoom;
        QUserRoom userRoom = QUserRoom.userRoom;

        List<String> userIds = List.of(senderId, receiverId);

        return queryFactory
                .select(chatRoom)
                .from(chatRoom)
                .where(chatRoom.id.in(
                        JPAExpressions
                                .select(userRoom.chatRoom.id)
                                .from(userRoom)
                                .where(userRoom.user.id.in(userIds))
                                .groupBy(userRoom.chatRoom.id)
                                .having(userRoom.user.id.countDistinct().eq(2L))
                ))
                .fetch()
                .stream()
                .findFirst();
    }
}
