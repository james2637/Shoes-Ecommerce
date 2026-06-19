package com.ravibanik.ecomproj.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;
    private String description;
    private String brand;
    @Column(nullable = false)
    private Double price;
    private String category;
    private Date releaseDate;
    private boolean available;
    private int stockQuantity;
    private String imageUrl;
}
