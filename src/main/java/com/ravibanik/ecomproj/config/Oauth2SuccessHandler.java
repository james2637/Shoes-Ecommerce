package com.ravibanik.ecomproj.config;

import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.entity.type.RoleType;
import com.ravibanik.ecomproj.repo.UserRepo;
import com.ravibanik.ecomproj.service.JwtService;
import com.ravibanik.ecomproj.service.SessionService;
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

    @Autowired
    private SessionService sessionService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;  // to get the token from authentication object
        OAuth2User oauth2user = token.getPrincipal();  // to get the user details from the token
        String email =  oauth2user.getAttribute("email");

        User user = userRepo.findByUsername(email);
        if (user == null) {
            // first time this email has signed in via OAuth2 -> create the account
            user = new User();
            user.setUsername(email);
            user.setPassword("");
            user.setName(oauth2user.getAttribute("name"));
            user.setRoles(Set.of(RoleType.CUSTOMER));
            userRepo.save(user);
        }


        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        sessionService.generateNewSession(user,refreshToken);

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        String redirectUrl = "http://localhost:5173/oauth-success?accessToken=" + accessToken;
        response.sendRedirect(redirectUrl);
    }
}
