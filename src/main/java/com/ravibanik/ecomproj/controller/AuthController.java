package com.ravibanik.ecomproj.controller;

import com.ravibanik.ecomproj.dto.LoginRequestDto;
import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private ResponseEntity<String> loginUser(@RequestBody LoginRequestDto loginReq){
        try {
            return ResponseEntity.ok(authService.loginUser(loginReq));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
