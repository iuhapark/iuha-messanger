package com.iuha.api.controller;

import com.iuha.api.service.impl.EventServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api")
public class EventController {
    private final EventServiceImpl eventService;

    // 클라이언트에서 구독하는 엔드포인트
    @GetMapping("/events")
    public SseEmitter subscribe() {
        // Timeout 무제한
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        eventService.addEmitter(emitter);
        eventService.sendEvents();
        return emitter;
    }
}

