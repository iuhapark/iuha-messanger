package com.iuha.api.repository;

import com.iuha.api.entity.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, String>, MessageRepositoryCustom {
}
