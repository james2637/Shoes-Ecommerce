package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.model.Product;
import com.ravibanik.ecomproj.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProduct(long id) {
        return productRepo.findById(id).orElse(null);
    }

    public Product addProduct(Product product){
        return productRepo.save(product);
    }
}
