package com.ravibanik.ecomproj.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    private long id;
    private String name;
    private String email;
    private String password;
}
