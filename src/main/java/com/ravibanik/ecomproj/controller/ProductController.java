package com.ravibanik.ecomproj.controller;

import com.ravibanik.ecomproj.dto.ProductDto;
import com.ravibanik.ecomproj.entity.Product;
import com.ravibanik.ecomproj.service.ImageUploadService;
import com.ravibanik.ecomproj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ImageUploadService imageUploadService;


    @GetMapping("/public/products")
    public ResponseEntity<List<ProductDto>> getAllProducts(@RequestParam(defaultValue = "inr") String currency) {

        return new ResponseEntity<>(productService.getAllProducts(currency), HttpStatus.OK);
    }

    @GetMapping("/public/product/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable long id, @RequestParam(defaultValue = "inr") String currency) {
        ProductDto product = productService.getProduct(id, currency);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/admin/product/create")
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

    @DeleteMapping("/admin/product/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();

    }

    @PutMapping("/admin/product/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}