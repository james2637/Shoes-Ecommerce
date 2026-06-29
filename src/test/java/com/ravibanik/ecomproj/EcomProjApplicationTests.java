package com.ravibanik.ecomproj;

import com.ravibanik.ecomproj.dto.ExchangeRateResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
class EcomProjApplicationTests {

    @Test
    void contextLoads() {
    }

    @Autowired
    private RestClient restClient;

    @Test
    public void testRestClient() {
        ExchangeRateResponseDto body = restClient
                                        .get()
                                        .uri("/pair/usd/inr/" + 10)
                                        .retrieve()
                                        .body(ExchangeRateResponseDto.class);

        System.out.println(body);
    }

}
