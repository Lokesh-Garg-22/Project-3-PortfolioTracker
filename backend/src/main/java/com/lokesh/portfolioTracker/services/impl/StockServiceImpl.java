package com.lokesh.portfolioTracker.services.impl;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.repositories.StockRepository;
import com.lokesh.portfolioTracker.services.StockService;

@Service
public class StockServiceImpl implements StockService {

    private StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public StockEntity createStock(StockEntity stockEntity) {
        return stockRepository.save(stockEntity);
    }

    @Override
    public boolean stockExists(String symbol) {
        List<StockEntity> response = stockRepository.findBySymbol(symbol);
        if (response.isEmpty())
            return false;
        return true;
    }

    @Override
    public List<StockEntity> stocks() {
        List<StockEntity> response = new LinkedList<>();
        for (StockEntity entity : stockRepository.findAll()) {
            response.add(entity);
        }
        return response;
    }

}
