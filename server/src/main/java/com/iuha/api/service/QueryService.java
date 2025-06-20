package com.iuha.api.service;

import com.iuha.api.component.Messenger;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

public interface QueryService<T> {
    List<T> findAll(PageRequest pageRequest);

    Optional<T> findById(Long id);

    Messenger count();

    boolean existsById(Long id);
}
