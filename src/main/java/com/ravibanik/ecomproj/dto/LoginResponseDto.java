package com.ravibanik.ecomproj.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {

    private long userId;
    private String accessToken;
    private String refreshToken;
}
