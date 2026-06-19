package com.ravibanik.ecomproj.dto;

import lombok.Data;

@Data
public class ProductDto {

        private Long id;
        private String name;
        private String description;
        private String brand;
        private double price;
        private String category;
        private String currency;
        private boolean available;
        private String imageUrl;
}
