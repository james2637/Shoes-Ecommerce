package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.dto.ExchangeRateResponseDto;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Data
public class ExchangeCurrencyService {

    private final RestClient restClient;


    public Double getExchangeRate(String baseCurrency, String targetCurrency, double amount) {


        ExchangeRateResponseDto response = restClient.
                get()
                .uri("/pair/" + baseCurrency + "/" + targetCurrency + "/" + amount)
                .retrieve()
                .body(ExchangeRateResponseDto.class);

        return response.getConversionResult();
    }


}
