package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.dto.ProductDto;
import com.ravibanik.ecomproj.entity.Product;
import com.ravibanik.ecomproj.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private ExchangeCurrencyService exchangeCurrencyService;

    public List<ProductDto> getAllProducts(String targetCurrency) {
        String baseCurrency = "inr";
        List<Product> products = productRepo.findAll();
        return products
                .stream()
                .map(product -> convertToDtoWithDynamicPricing(product, baseCurrency, targetCurrency))
                .collect(Collectors.toList());

    }

    private ProductDto convertToDtoWithDynamicPricing(Product product, String baseCode, String targetCode){  // helper methd
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setImageUrl(product.getImageUrl());
        productDto.setBrand(product.getBrand());
        productDto.setCategory(product.getCategory());
        productDto.setAvailable(product.isAvailable());
        productDto.setCurrency(targetCode);
        productDto.setPrice(exchangeCurrencyService.getExchangeRate(baseCode,targetCode,product.getPrice()));

        return productDto;
    }

    public ProductDto getProduct(long id, String targetCurrency) {
        Product product =  productRepo.findById(id).orElse(null);
        return convertToDtoWithDynamicPricing(product,"inr",targetCurrency);
    }

    public Product addProduct(Product product){
        return productRepo.save(product);
    }

    public void deleteProduct(long id){
        productRepo.deleteById(id);
    }

    public Product updateProduct(long id, Product updatedProduct){
        return productRepo.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setBrand(updatedProduct.getBrand());
            product.setPrice(updatedProduct.getPrice());
            product.setCategory(updatedProduct.getCategory());
            product.setReleaseDate(updatedProduct.getReleaseDate());
            product.setAvailable(updatedProduct.isAvailable());
            product.setStockQuantity(updatedProduct.getStockQuantity());
            return productRepo.save(product);
        }).orElse(null);
    }
}
