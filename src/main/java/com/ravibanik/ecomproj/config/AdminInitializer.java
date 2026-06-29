package com.ravibanik.ecomproj.config;

import com.ravibanik.ecomproj.entity.User;
import com.ravibanik.ecomproj.entity.type.RoleType;
import com.ravibanik.ecomproj.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class AdminInitializer implements CommandLineRunner {

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepo userRepo;

    @Override
    public void run(String... args) throws Exception {

        if(userRepo.findByUsername("admin@mixdan.com") == null){
            User admin = new User();
            admin.setName("admin");     // username
            admin.setUsername("admin@mixdan.com");
            admin.setPassword(passwordEncoder.encode("AdminRavi@123"));  //password
            admin.setRoles(Set.of(RoleType.ADMIN));

            userRepo.save(admin);
            System.out.println("Admin Account Created");
        }
    }
}
