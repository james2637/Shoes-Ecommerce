package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.entity.Session;
import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.repo.SessionRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepo sessionRepo;
    private final int SESSION_LIMIT = 2;

    public void generateNewSession(User user, String refreshToken) {

        List<Session> currentlyActiveSession = sessionRepo.findByUser(user);  //fetching all the session of a user

        if(currentlyActiveSession.size() >= SESSION_LIMIT){
            currentlyActiveSession.sort(Comparator.comparing(session -> session.getLastAccessed()));   // sorting the session using lastAccess
            Session leastActiveSession = currentlyActiveSession.getFirst();
            sessionRepo.delete(leastActiveSession);           // delete the more old lastAccess session
        }

        Session newSession = new Session();
        newSession.setUser(user);
        newSession.setLastAccessed(LocalDateTime.now());
        newSession.setRefreshToken(refreshToken);
        sessionRepo.save(newSession);
    }

    public void validateSession(String refreshToken) {
        Session session = sessionRepo.findByRefreshToken(refreshToken)               // checking the refresh Token is present in the db with some session or not
                .orElseThrow(() -> new SessionAuthenticationException("Session not found for this refresh token"));    //if not we will not pass the access token even if the refresh token is valid (but its impossible to happen so chill)

        session.setLastAccessed(LocalDateTime.now());   // this method is only used before sending a new access Token so that means user is making request so we can used this like last Access time
        sessionRepo.save(session);
    }

}
