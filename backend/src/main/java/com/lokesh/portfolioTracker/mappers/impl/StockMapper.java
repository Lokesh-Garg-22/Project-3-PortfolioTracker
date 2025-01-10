package com.lokesh.portfolioTracker.mappers.impl;

import org.modelmapper.ModelMapper;

import com.lokesh.portfolioTracker.domain.dto.StockDto;
import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.mappers.Mapper;

public class StockMapper implements Mapper<StockEntity, StockDto> {

    private ModelMapper modelMapper;

    public StockMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public StockDto mapTo(StockEntity stockEntity) {
        return modelMapper.map(stockEntity, StockDto.class);
    }

    @Override
    public StockEntity mapFrom(StockDto stockDto) {
        return modelMapper.map(stockDto, StockEntity.class);
    }

}
