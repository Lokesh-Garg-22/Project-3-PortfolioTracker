package com.lokesh.portfolioTracker.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lokesh.portfolioTracker.domain.entities.StockEntity;

@Repository
public interface StockRepository extends CrudRepository<StockEntity, Long> {

    List<StockEntity> findByName(String name);

    List<StockEntity> findBySymbol(String symbol);

}
