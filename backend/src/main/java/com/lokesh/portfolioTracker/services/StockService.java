package com.lokesh.portfolioTracker.services;

import java.util.List;
import java.util.Optional;

import com.lokesh.portfolioTracker.domain.entities.StockEntity;

public interface StockService {

    public StockEntity createUpdateStock(Long id, StockEntity stockEntity);

    public Optional<StockEntity> findStock(String symbol);

    public boolean stockExists(String symbol);

    public List<StockEntity> stocks();

}
