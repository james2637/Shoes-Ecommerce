package com.ravibanik.ecomproj.advices;

import io.jsonwebtoken.JwtException;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.AuthenticationException;
import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ApiErrorResponse> handleResourceNotFound(NullPointerException exception){
        ApiErrorResponse apiError = ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .message("Resource not found")
                .details(exception.getMessage())
                .build();
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiErrorResponse> handleAuthenticationException(AuthenticationException exception) {
        ApiErrorResponse apiError = ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .message("Unauthorized")
                .details(exception.getLocalizedMessage())
                .build();
        return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiErrorResponse> handleIllegalArgument( IllegalArgumentException exception){
        ApiErrorResponse apiError = ApiErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .message("User with this email already exits")
                .details(exception.getMessage())
                .build();
        return new ResponseEntity<>(apiError, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ApiErrorResponse> handleJwtException(JwtException exception){
        ApiErrorResponse apiErrorResponse = new ApiErrorResponse(LocalDateTime.now(), "Jwt token is expired", exception.getLocalizedMessage());
        return new ResponseEntity<>(apiErrorResponse, HttpStatus.UNAUTHORIZED);
    }


}