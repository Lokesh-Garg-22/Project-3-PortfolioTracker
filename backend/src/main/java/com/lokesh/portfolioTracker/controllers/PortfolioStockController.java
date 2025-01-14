package com.lokesh.portfolioTracker.controllers;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.lokesh.portfolioTracker.domain.dto.PortfolioStockDto;
import com.lokesh.portfolioTracker.domain.dto.StockDto;
import com.lokesh.portfolioTracker.domain.dto.UserDto;
import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;
import com.lokesh.portfolioTracker.mappers.Mapper;
import com.lokesh.portfolioTracker.services.PortfolioStockService;
import com.lokesh.portfolioTracker.services.StockService;
import com.lokesh.portfolioTracker.services.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@RestController
public class PortfolioStockController {

    private PortfolioStockService portfolioStockService;
    private UserService userService;
    private StockService stockService;

    private Mapper<PortfolioStockEntity, PortfolioStockDto> portfolioStockMapper;
    private Mapper<StockEntity, StockDto> stockMapper;
    private Mapper<UserEntity, UserDto> userMapper;

    public PortfolioStockController(
            PortfolioStockService portfolioStockService,
            UserService userService,
            StockService stockService,
            Mapper<PortfolioStockEntity, PortfolioStockDto> portfolioStockMapper,
            Mapper<StockEntity, StockDto> stockMapper,
            Mapper<UserEntity, UserDto> userMapper) {
        this.portfolioStockService = portfolioStockService;
        this.userService = userService;
        this.stockService = stockService;

        this.portfolioStockMapper = portfolioStockMapper;
        this.stockMapper = stockMapper;
        this.userMapper = userMapper;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    private static class AddStockRequest {
        public UserDto user;
        public StockDto stock;
        public Number quantity;
    }

    @PostMapping(path = "/portfolio")
    public List<PortfolioStockDto> userPortfolio(@RequestBody UserDto userDto) {
        UserEntity userEntity = userMapper.mapFrom(userDto);

        userEntity = userService.checkAuthentication(userEntity);

        List<PortfolioStockDto> portfolioStockDtos = new LinkedList<>();
        for (PortfolioStockEntity portfolioStockEntity : portfolioStockService.portfolioStocks(userEntity)) {
            portfolioStockDtos.add(portfolioStockMapper.mapTo(portfolioStockEntity));
        }

        return portfolioStockDtos;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    private static class UserPortfolioStats {
        public Number quantity;
        public Number avarageValue;
        public Number totalValue;
    }

    @PostMapping(path = "/portfolio/stats")
    public UserPortfolioStats userPortfolioStats(@RequestBody UserDto userDto) {
        UserEntity userEntity = userMapper.mapFrom(userDto);

        userEntity = userService.checkAuthentication(userEntity);

        UserPortfolioStats userPortfolioStats = new UserPortfolioStats(0, 0, 0);
        for (PortfolioStockEntity portfolioStockEntity : portfolioStockService.portfolioStocks(userEntity)) {
            userPortfolioStats.quantity = userPortfolioStats.quantity.longValue()
                    + portfolioStockEntity.getQuantity().longValue();
            userPortfolioStats.totalValue = userPortfolioStats.totalValue.floatValue()
                    + (portfolioStockEntity.getQuantity().floatValue()
                            * portfolioStockEntity.getStock().getPrice().floatValue());
        }
        userPortfolioStats.avarageValue = userPortfolioStats.totalValue.floatValue()
                / userPortfolioStats.quantity.longValue();

        return userPortfolioStats;
    }

    @PostMapping(path = "/portfolio/stock/add")
    public PortfolioStockDto addStock(@RequestBody AddStockRequest request) {
        UserEntity userEntity = userMapper.mapFrom(request.user);
        StockEntity stockEntity = stockMapper.mapFrom(request.stock);

        userEntity = userService.checkAuthentication(userEntity);

        Optional<StockEntity> findStockEntity = stockService.findStock(stockEntity.getSymbol());
        if (findStockEntity.isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock does not exist");
        else
            stockEntity = findStockEntity.get();

        PortfolioStockEntity portfolioStockEntity = PortfolioStockEntity.builder()
                .stock(stockEntity)
                .user(userEntity)
                .Quantity(request.quantity)
                .build();

        portfolioStockEntity = portfolioStockService.createUpdatePortfolioStock(
                portfolioStockEntity.getId(),
                portfolioStockEntity);

        return portfolioStockMapper.mapTo(portfolioStockEntity);
    }

}
