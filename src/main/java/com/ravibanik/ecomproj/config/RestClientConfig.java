package com.ravibanik.ecomproj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

import static org.apache.tomcat.util.http.fileupload.FileUploadBase.CONTENT_TYPE;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Configuration
public class RestClientConfig {

    private String apiKey = "af45b3e1e794c102484df23c";

    @Bean
    RestClient getCurrenciesRatesRestClient(){     // just implementation of rest client to use it
        return RestClient.builder()
                .baseUrl("https://v6.exchangerate-api.com/v6/"+ apiKey)
                .defaultHeader(CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .build();
    }
}
