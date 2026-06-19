package com.ravibanik.ecomproj.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


@Data
public class ExchangeRateResponseDto {

    @JsonProperty("base_code")
    private String baseCode;

    @JsonProperty("target_code")
    private String targetCode;

    @JsonProperty("conversion_rate")
    private double conversionRate;

    @JsonProperty("time_last_update_utc")
    private String lastTimeUpdate;

    @JsonProperty("conversion_result")
    private double conversionResult;
}
