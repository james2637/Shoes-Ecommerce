package com.ravibanik.ecomproj.config;

import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.entity.type.RoleType;
import com.ravibanik.ecomproj.repo.UserRepo;
import com.ravibanik.ecomproj.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Set;

@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;  // to get the token from authentication object
        OAuth2User user = token.getPrincipal();  // to get the user details from the token

        String email =  user.getAttribute("email");

        if(userRepo.findByUsername(email) != null) {
            throw new IllegalArgumentException("email already exists");
        }

        User newUser = new User();
        newUser.setUsername(email);
        newUser.setPassword("");
        newUser.setName(user.getAttribute("name"));
        newUser.setRoles(Set.of(RoleType.CUSTOMER));
        userRepo.save(newUser);

        String accessToken = jwtService.generateAccessToken(newUser);
        String refreshToken = jwtService.generateRefreshToken(newUser);

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}
