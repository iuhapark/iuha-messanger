package com.iuha.api.service;


import com.iuha.api.component.Messenger;

public interface CommandService<T> {
    Messenger save(T t);

    Messenger delete(Long id);

    Messenger update(T t);
}
