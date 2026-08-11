package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.dto.LoginRequestDto;
import com.ravibanik.ecomproj.dto.LoginResponseDto;
import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.entity.type.RoleType;
import com.ravibanik.ecomproj.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SessionService sessionService;

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
            throw new AuthenticationException("Invalid username - username not exits");
        }
        if (loginRequestDto.getPassword() == null || !passwordEncoder.matches(loginRequestDto.getPassword(), userRepo.findByUsername(loginRequestDto.getUsername()).getPassword())) {
            throw new IllegalArgumentException("password is invalid");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        sessionService.generateNewSession(user,refreshToken);

        return new LoginResponseDto(user.getId(), accessToken, refreshToken);
    }

    public String getAccessToken(String refreshToken) throws AuthenticationException {
        long userId = jwtService.getUserId(refreshToken);

        User user = userRepo.findById(userId).orElseThrow(() -> new AuthenticationCredentialsNotFoundException("Invalid refresh token"));
        sessionService.validateSession(refreshToken);

        return jwtService.generateAccessToken(user);
    }
}
