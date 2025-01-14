package com.lokesh.portfolioTracker.mappers.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import com.lokesh.portfolioTracker.domain.dto.PortfolioStockDto;
import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.mappers.Mapper;

@Component
public class PortfolioStockMapperImpl implements Mapper<PortfolioStockEntity, PortfolioStockDto> {

    private ModelMapper modelMapper;

    public PortfolioStockMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public PortfolioStockDto mapTo(PortfolioStockEntity portfolioStockEntity) {
        return modelMapper.map(portfolioStockEntity, PortfolioStockDto.class);
    }

    @Override
    public PortfolioStockEntity mapFrom(PortfolioStockDto portfolioStockDto) {
        return modelMapper.map(portfolioStockDto, PortfolioStockEntity.class);
    }

}
