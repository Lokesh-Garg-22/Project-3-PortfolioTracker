package com.lokesh.portfolioTracker.services;

import java.util.List;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;

public interface PortfolioStockService {

    public PortfolioStockEntity createUpdatePortfolioStock(Long id, PortfolioStockEntity portfolioStockEntity);

    public List<PortfolioStockEntity> portfolioStocks();

}
