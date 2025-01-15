package com.lokesh.portfolioTracker.controllers;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        @SuppressWarnings("unused")
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
        if (userPortfolioStats.quantity.longValue() != 0)
            userPortfolioStats.avarageValue = userPortfolioStats.totalValue.floatValue()
                    / userPortfolioStats.quantity.longValue();

        return userPortfolioStats;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    private static class PortfolioStockRequest {
        public UserDto user;
        public Number id;
    }

    @PostMapping(path = "/portfolio/stock")
    public PortfolioStockDto portfolioStock(@RequestBody PortfolioStockRequest requestBody) {
        UserEntity userEntity = userMapper.mapFrom(requestBody.user);
        userEntity = userService.checkAuthentication(userEntity);

        Optional<PortfolioStockEntity> optionalPortfolioStock = portfolioStockService
                .portfolioStock(requestBody.id.longValue());

        if (optionalPortfolioStock.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock not found");
        }

        return portfolioStockMapper.mapTo(optionalPortfolioStock.get());
    }

    @NoArgsConstructor
    @AllArgsConstructor
    private static class AddStockRequest {
        public UserDto user;
        public StockDto stock;
        public Number quantity;
    }

    @PostMapping(path = "/portfolio/stock/add")
    public PortfolioStockDto addPortfolioStock(@RequestBody AddStockRequest requestBody) {
        UserEntity userEntity = userMapper.mapFrom(requestBody.user);
        userEntity = userService.checkAuthentication(userEntity);

        StockEntity stockEntity = stockMapper.mapFrom(requestBody.stock);
        Optional<StockEntity> findStockEntity = stockService.findStock(stockEntity.getSymbol());
        if (findStockEntity.isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock does not exist");
        else
            stockEntity = findStockEntity.get();

        PortfolioStockEntity portfolioStockEntity = PortfolioStockEntity.builder()
                .stock(stockEntity)
                .user(userEntity)
                .Quantity(requestBody.quantity)
                .build();

        System.out.println(portfolioStockEntity);

        portfolioStockEntity = portfolioStockService.createUpdatePortfolioStock(
                portfolioStockEntity.getId(),
                portfolioStockEntity);

        return portfolioStockMapper.mapTo(portfolioStockEntity);
    }

    @NoArgsConstructor
    @AllArgsConstructor
    private static class UpdatePortfolioStockRequest {
        public UserDto user;
        public PortfolioStockDto portfolioStock;
        public Number id;
    }

    @PostMapping(path = "/portfolio/stock/update")
    public PortfolioStockDto updatePortfolioStock(@RequestBody UpdatePortfolioStockRequest requestBody) {
        UserEntity userEntity = userMapper.mapFrom(requestBody.user);
        userEntity = userService.checkAuthentication(userEntity);

        Optional<PortfolioStockEntity> portfolioStockFound = portfolioStockService
                .portfolioStock(requestBody.id.longValue());

        if (portfolioStockFound.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock not found");
        }
        if (!portfolioStockFound.get().getUser().equals(userEntity)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Stock does not belong to user");
        }

        PortfolioStockEntity portfolioStockEntity = portfolioStockMapper.mapFrom(requestBody.portfolioStock);
        portfolioStockEntity.setUser(portfolioStockFound.get().getUser());
        portfolioStockEntity.setStock(portfolioStockFound.get().getStock());

        portfolioStockEntity = portfolioStockService.createUpdatePortfolioStock(
                portfolioStockEntity.getId(),
                portfolioStockEntity);

        return portfolioStockMapper.mapTo(portfolioStockEntity);
    }

    @NoArgsConstructor
    @AllArgsConstructor
    private static class DeletePortfolioStockRequest {
        public UserDto user;
        public Number id;
    }

    @PostMapping(path = "/portfolio/stock/delete")
    public Boolean deletePortfolioStock(@RequestBody DeletePortfolioStockRequest requestBody) {
        UserEntity userEntity = userMapper.mapFrom(requestBody.user);
        userEntity = userService.checkAuthentication(userEntity);

        Optional<PortfolioStockEntity> portfolioStockEntity = portfolioStockService
                .portfolioStock(requestBody.id.longValue());

        if (portfolioStockEntity.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock not found");
        }
        if (!portfolioStockEntity.get().getUser().equals(userEntity)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Stock does not belong to user");
        }

        return portfolioStockService.detelePortfolioStock(portfolioStockEntity.get().getId());
    }

}
