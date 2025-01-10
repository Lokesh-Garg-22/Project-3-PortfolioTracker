package com.lokesh.portfolioTracker.services;

import java.util.List;

import com.lokesh.portfolioTracker.domain.entities.StockEntity;

public interface StockService {

    public StockEntity createStock(StockEntity stockEntity);

    public boolean stockExists(String symbol);

    public List<StockEntity> stocks();

}
