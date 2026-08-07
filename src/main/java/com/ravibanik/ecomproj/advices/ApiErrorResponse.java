package com.ravibanik.ecomproj.advices;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;


@Data
@Builder
public class ApiErrorResponse {

    public LocalDateTime timestamp;
    public String message;
    public String details;

}
