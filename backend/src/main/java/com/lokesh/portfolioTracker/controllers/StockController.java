package com.lokesh.portfolioTracker.controllers;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lokesh.portfolioTracker.domain.dto.StockDto;
import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.mappers.Mapper;
import com.lokesh.portfolioTracker.services.StockService;

@RestController
public class StockController {

    private StockService stockService;

    private Mapper<StockEntity, StockDto> stockMapper;

    public StockController(StockService stockService, Mapper<StockEntity, StockDto> stockMapper) {
        this.stockService = stockService;
        this.stockMapper = stockMapper;
    }

    @GetMapping(path = "/stocks")
    public List<StockDto> stocks() {
        List<StockDto> stockDtos = new LinkedList<>();
        stockService.stocks().forEach(
                stockEntity -> {
                    stockDtos.add(stockMapper.mapTo(stockEntity));
                });
        return stockDtos;
    }

}
