package com.ravibanik.ecomproj.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Orders {

    @Id
    private long id;
    private String orderNumber;
    private String userId;
    private List<String> productId;
    private String orderDate;
    private String status;
    private double totalAmount;
}
