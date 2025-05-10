package com.iuha.api.repository;

import com.iuha.api.entity.model.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoomRepository extends JpaRepository<UserRoom, String> {
}
