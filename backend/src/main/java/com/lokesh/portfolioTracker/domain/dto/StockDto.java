package com.lokesh.portfolioTracker.domain.dto;

import lombok.Data;
import lombok.Builder;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockDto {

    private Long id;

    private String name;

    private String symbol;

    @Builder.Default
    private Number price = 0;

    private Date lastUpdated;

}
