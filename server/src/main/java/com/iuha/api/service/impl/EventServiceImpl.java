package com.iuha.api.service.impl;

import com.iuha.api.component.Messenger;
import com.iuha.api.entity.dto.EventDto;
import com.iuha.api.entity.model.Event;
import com.iuha.api.repository.EventRepository;
import com.iuha.api.repository.UserRepository;
import com.iuha.api.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public void addEmitter(SseEmitter emitter) {
        emitters.add(emitter);
        /** SseEmitter의 상태를 관리하기 위한 콜백 메서드 설정 */
        // 클라이언트 연결 종료 시 emitter 제거
        emitter.onCompletion(() -> emitters.remove(emitter));
        // 타임아웃 발생 시 emitter 제거
        emitter.onTimeout(() -> emitters.remove(emitter));
        // 에러 발생 시 emitter 제거
        emitter.onError((e) -> {emitters.remove(emitter);});
    }

    /** 주기적으로 이벤트를 전송하는 메서드 (2초마다 실행) */
    @Scheduled(fixedRate = 2000)
    public void sendEvents() {
        for (SseEmitter emitter : emitters) {
            try {
                String data = "Hello, World! " + LocalDateTime.now();
                emitter.send(SseEmitter.event().name("message").data("Hello, World!"));
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }

    private void sendEventUpdate(Event issue) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(issue);
            } catch (IOException e) {
                emitter.complete();
                emitters.remove(emitter);
            }
        }
    }

    @Override
    public Messenger save(EventDto eventDto) {
        return null;
    }

    @Override
    public Messenger delete(Long id) {
        return null;
    }

    @Override
    public Messenger update(EventDto eventDto) {
        return null;
    }

    @Override
    public List<EventDto> findAll(PageRequest pageRequest) {
        return null;
    }

    @Override
    public Optional<EventDto> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Messenger count() {
        return null;
    }

    @Override
    public boolean existsById(Long id) {
        return false;
    }
}
