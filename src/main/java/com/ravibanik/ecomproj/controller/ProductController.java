package com.ravibanik.ecomproj.controller;

import com.ravibanik.ecomproj.model.Product;
import com.ravibanik.ecomproj.service.ImageUploadService;
import com.ravibanik.ecomproj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ImageUploadService imageUploadService;


    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {

        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable long id) {
        Product product = productService.getProduct(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/product/create")
    public ResponseEntity<Product> createProduct(@RequestPart Product product, @RequestParam("image") MultipartFile imagefile) {

        try {
            // Upload file to cloud storage
            String imageUrl = imageUploadService.uploadImage(imagefile);
            product.setImageUrl(imageUrl);

            Product savedProduct = productService.addProduct(product);
            return ResponseEntity.ok(savedProduct);

        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }


}