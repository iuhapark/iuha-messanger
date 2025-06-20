package com.iuha.api.service;

import com.iuha.api.entity.dto.ChatRoomDto;
import com.iuha.api.entity.dto.SessionUser;
import com.iuha.api.entity.model.ChatRoom;

import java.util.List;

public interface ChatRoomService {
    List<ChatRoomDto> getMyRooms(SessionUser user);
    ChatRoom saveRoom(SessionUser user, ChatRoomDto dto) throws Exception;
}
