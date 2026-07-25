package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.dto.LoginRequestDto;
import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.entity.type.RoleType;
import com.ravibanik.ecomproj.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
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

    public String loginUser(LoginRequestDto loginRequestDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
        );

        User user = (User) authentication.getPrincipal();

        return jwtService.generateToken(user);
    }
}
