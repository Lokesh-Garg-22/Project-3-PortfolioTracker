package com.lokesh.portfolioTracker.domain.dto;

import lombok.Data;
import lombok.Builder;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PortfolioStockDto {

    private Long id;

    private StockDto stock;

    private UserDto user;

    private Number Quantity;

}
