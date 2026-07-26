package com.ravibanik.ecomproj.config;

import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.repo.UserRepo;
import com.ravibanik.ecomproj.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepo userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String HeaderToken = request.getHeader("Authorization");  // just getting the token from the request header Authorization
        if(HeaderToken == null || !HeaderToken.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = HeaderToken.split("Bearer ")[1];
        String username = jwtService.getUsername(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            User user = userRepo.findByUsername(username);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);

    }
}
