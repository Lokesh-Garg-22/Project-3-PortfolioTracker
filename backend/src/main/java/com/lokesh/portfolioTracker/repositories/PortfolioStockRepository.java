package com.lokesh.portfolioTracker.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;

@Repository
public interface PortfolioStockRepository extends CrudRepository<PortfolioStockEntity, Long> {

    List<PortfolioStockEntity> findByUser(UserEntity userEntity);

}
