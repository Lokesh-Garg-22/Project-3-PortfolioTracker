package com.lokesh.portfolioTracker.services;

import java.util.List;
import java.util.Optional;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;

public interface PortfolioStockService {

    public PortfolioStockEntity createUpdatePortfolioStock(Long id, PortfolioStockEntity portfolioStockEntity);

    public Optional<PortfolioStockEntity> portfolioStock(Long id);

    public List<PortfolioStockEntity> portfolioStocks();

    public List<PortfolioStockEntity> portfolioStocks(UserEntity userEntity);

    public Boolean detelePortfolioStock(Long id);

}
