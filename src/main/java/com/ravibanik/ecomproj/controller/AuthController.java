package com.ravibanik.ecomproj.controller;

import com.ravibanik.ecomproj.dto.LoginRequestDto;
import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.service.AuthService;
import jakarta.servlet.http.Cookie;
import com.ravibanik.ecomproj.dto.LoginResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.util.Arrays;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            authService.createUser(user);
            return ResponseEntity.ok("User registered successfully");
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    private ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginReq,HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

      try {
          LoginResponseDto loginResponse = authService.loginUser(loginReq);

          Cookie cookie = new Cookie("refreshToken", loginResponse.getRefreshToken());
          cookie.setHttpOnly(true);
//          cookie.setSecure(true);
          response.addCookie(cookie);

          return new ResponseEntity<>(loginResponse, HttpStatus.OK);
      }catch (AuthenticationException e) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
      }
    }

    @PostMapping("/reAuthenticate")
    private ResponseEntity<String> refreshToken(HttpServletRequest request) throws AuthenticationException {

        String refreshToken = String.valueOf(Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(cookie -> cookie.getValue())
                .orElseThrow(() -> new AuthenticationException("Refresh token not found")));

        String accessToken = authService.getAccessToken(refreshToken);
        return ResponseEntity.ok(accessToken);
    }

}
