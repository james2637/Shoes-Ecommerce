package com.ravibanik.ecomproj.service;

import com.ravibanik.ecomproj.dto.ExchangeRateResponseDto;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@Data
public class ExchangeCurrencyService {

    private final RestClient restClient;

    Logger log = LoggerFactory.getLogger(ExchangeCurrencyService.class);

    public Double getExchangeRate(String baseCurrency, String targetCurrency, double amount) {

        try {
            ExchangeRateResponseDto response = restClient.
                    get()
                    .uri("/pair/" + baseCurrency + "/" + targetCurrency + "/" + amount)
                    .retrieve()
                    .body(ExchangeRateResponseDto.class);

            log.info("Currency exchange rate Successful");

            return response.getConversionResult();
        } catch (Exception e) {
            log.error("Error occured in ExchangeCurrencyRateService", e.getMessage());
            throw new RuntimeException(e);
        }

    }
}
