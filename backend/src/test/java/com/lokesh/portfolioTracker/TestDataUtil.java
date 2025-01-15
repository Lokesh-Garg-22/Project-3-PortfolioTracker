package com.lokesh.portfolioTracker;

import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;

public final class TestDataUtil {
    private TestDataUtil() {
    }

    public static UserEntity createTestUserA() {
        return UserEntity.builder()
                .name("A User Test")
                .username("a_usertest")
                .password("a_usertest")
                .build();
    }

    public static UserEntity createTestUserB() {
        return UserEntity.builder()
                .name("B User Test")
                .username("b_usertest")
                .password("b_usertest")
                .build();
    }

    public static UserEntity createTestUserC() {
        return UserEntity.builder()
                .name("C User Test")
                .username("c_usertest")
                .password("c_usertest")
                .build();
    }

    public static StockEntity createTestStockEntityA() {
        return StockEntity.builder()
                .name("Stock 1")
                .symbol("STK")
                .build();
    }

    public static StockEntity createTestStockEntityB() {
        return StockEntity.builder()
                .name("Stock 2")
                .symbol("HTE")
                .build();
    }

    public static PortfolioStockEntity createTestPortfolioStockEntity() {
        return PortfolioStockEntity.builder()
                .Quantity(2)
                .build();
    }

}
