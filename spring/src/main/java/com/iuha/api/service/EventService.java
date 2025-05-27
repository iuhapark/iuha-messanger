package com.iuha.api.service;

import com.iuha.api.entity.dto.EventDto;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface EventService extends CommandService<EventDto>, QueryService<EventDto> {

    void addEmitter(SseEmitter emitter);
    public void sendEvents();
}
