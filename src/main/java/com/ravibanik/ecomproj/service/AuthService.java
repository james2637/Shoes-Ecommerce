package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.advices.GlobalExceptionHandler;
import com.ravibanik.ecomproj.dto.LoginRequestDto;
import com.ravibanik.ecomproj.dto.LoginResponseDto;
import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.entity.type.RoleType;
import com.ravibanik.ecomproj.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void createUser(User user) {
        if(userRepo.findByUsername(user.getUsername()) != null){
            throw new IllegalArgumentException("User with this email already exits");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(Set.of(RoleType.CUSTOMER));
        userRepo.save(user);
    }


    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws AuthenticationException {
        if (userRepo.findByUsername(loginRequestDto.getUsername()) == null) {
            throw new AuthenticationException("Invalid username or password");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new LoginResponseDto(user.getId(), accessToken, refreshToken);
    }

    public String getAccessToken(String refreshToken) throws AuthenticationException {
        long userId = jwtService.getUserId(refreshToken);

        User user = userRepo.findById(userId).orElseThrow(() -> new AuthenticationCredentialsNotFoundException("Invalid refresh token"));

        return jwtService.generateAccessToken(user);
    }
}
