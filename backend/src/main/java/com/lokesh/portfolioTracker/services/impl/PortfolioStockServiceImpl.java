package com.lokesh.portfolioTracker.services.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.repositories.PortfolioStockRepository;
import com.lokesh.portfolioTracker.services.PortfolioStockService;

@Service
public class PortfolioStockServiceImpl implements PortfolioStockService {

    private PortfolioStockRepository portfolioStockRepository;

    public PortfolioStockServiceImpl(PortfolioStockRepository portfolioStockRepository) {
        this.portfolioStockRepository = portfolioStockRepository;
    }

    @Override
    public PortfolioStockEntity createUpdatePortfolioStock(Long id, PortfolioStockEntity portfolioStockEntity) {
        portfolioStockEntity.setId(id);
        return portfolioStockRepository.save(portfolioStockEntity);
    }

    @Override
    public List<PortfolioStockEntity> portfolioStocks() {
        List<PortfolioStockEntity> response = new LinkedList<>();
        for (PortfolioStockEntity entity : portfolioStockRepository.findAll()) {
            response.add(entity);
        }
        return response;
    }

}
