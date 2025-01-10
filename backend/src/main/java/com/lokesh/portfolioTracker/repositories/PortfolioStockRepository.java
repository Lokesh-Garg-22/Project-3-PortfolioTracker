package com.lokesh.portfolioTracker.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;

@Repository
public interface PortfolioStockRepository extends CrudRepository<PortfolioStockEntity, Long> {

}
