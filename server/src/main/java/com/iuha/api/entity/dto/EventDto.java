package com.iuha.api.entity.dto;

import com.iuha.api.entity.model.User;
import lombok.*;
import org.springframework.stereotype.Component;
@NoArgsConstructor
@AllArgsConstructor
@Component
@Data
@Builder
@Getter
public class EventDto {
    private Long id;
    private String regDate;
    private String modDate;
}
