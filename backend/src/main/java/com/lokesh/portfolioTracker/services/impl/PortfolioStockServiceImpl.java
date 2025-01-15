package com.lokesh.portfolioTracker.services.impl;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;
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
    public Optional<PortfolioStockEntity> portfolioStock(Long id) {
        return portfolioStockRepository.findById(id);
    }

    @Override
    public List<PortfolioStockEntity> portfolioStocks() {
        List<PortfolioStockEntity> response = new LinkedList<>();
        for (PortfolioStockEntity entity : portfolioStockRepository.findAll()) {
            response.add(entity);
        }
        return response;
    }

    @Override
    public List<PortfolioStockEntity> portfolioStocks(UserEntity userEntity) {
        List<PortfolioStockEntity> response = new LinkedList<>();
        for (PortfolioStockEntity entity : portfolioStockRepository.findByUser(userEntity)) {
            response.add(entity);
        }
        return response;
    }

    @Override
    public Boolean detelePortfolioStock(Long id) {
        portfolioStockRepository.deleteById(id);
        return !portfolioStockRepository.existsById(id);
    }

}
