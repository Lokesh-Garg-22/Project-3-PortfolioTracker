package com.lokesh.portfolioTracker.repositories;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.lokesh.portfolioTracker.TestDataUtil;
import com.lokesh.portfolioTracker.domain.entities.PortfolioStockEntity;
import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.domain.entities.UserEntity;

import jakarta.transaction.Transactional;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class PortfolioStockRepositoryIntegrationTests {

    private StockRepository stockRepository;
    private UserRepository userRepository;
    private PortfolioStockRepository underTest;

    @Autowired
    public PortfolioStockRepositoryIntegrationTests(StockRepository stockRepository, UserRepository userRepository,
            PortfolioStockRepository underTest) {
        this.stockRepository = stockRepository;
        this.userRepository = userRepository;
        this.underTest = underTest;
    }

    @Test
    @Transactional
    public void testThatPortfolioStockCanBeCreatedAndRecalled() {
        PortfolioStockEntity portfolioStock = TestDataUtil.createTestPortfolioStockEntity();
        StockEntity stock = TestDataUtil.createTestStockEntityA();
        UserEntity user = TestDataUtil.createTestUserA();

        stock = stockRepository.save(stock);
        user = userRepository.save(user);

        portfolioStock.setStock(stock);
        portfolioStock.setUser(user);

        underTest.save(portfolioStock);

        Optional<PortfolioStockEntity> result = underTest.findById(portfolioStock.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(portfolioStock);
    }

    @Test
    @Transactional
    public void testThatMultiplePortfolioStockCanBeCreatedAndRecalled() {
        PortfolioStockEntity portfolioStockA = TestDataUtil.createTestPortfolioStockEntity();
        PortfolioStockEntity portfolioStockB = TestDataUtil.createTestPortfolioStockEntity();
        StockEntity stockA = TestDataUtil.createTestStockEntityA();
        StockEntity stockB = TestDataUtil.createTestStockEntityB();
        UserEntity user = TestDataUtil.createTestUserA();

        stockA = stockRepository.save(stockA);
        stockB = stockRepository.save(stockB);
        user = userRepository.save(user);

        portfolioStockA.setStock(stockA);
        portfolioStockA.setUser(user);
        underTest.save(portfolioStockA);

        portfolioStockB.setStock(stockB);
        portfolioStockB.setUser(user);
        underTest.save(portfolioStockB);

        Iterable<PortfolioStockEntity> result = underTest.findAll();
        assertThat(result).hasSize(2).containsExactly(portfolioStockA, portfolioStockB);
    }

    @Test
    @Transactional
    public void testThatPortfolioStockCanBeUpdated() {
        PortfolioStockEntity portfolioStock = TestDataUtil.createTestPortfolioStockEntity();
        StockEntity stock = TestDataUtil.createTestStockEntityA();
        UserEntity user = TestDataUtil.createTestUserA();
        portfolioStock.setStock(stock);
        portfolioStock.setUser(user);

        underTest.save(portfolioStock);

        portfolioStock.setQuantity(6);
        underTest.save(portfolioStock);
        Optional<PortfolioStockEntity> result = underTest.findById(portfolioStock.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(portfolioStock);
    }

    @Test
    @Transactional
    public void testThatPortfolioStockCanBeDeleted() {
        PortfolioStockEntity portfolioStock = TestDataUtil.createTestPortfolioStockEntity();
        StockEntity stock = TestDataUtil.createTestStockEntityA();
        UserEntity user = TestDataUtil.createTestUserA();
        portfolioStock.setStock(stock);
        portfolioStock.setUser(user);

        underTest.save(portfolioStock);

        underTest.deleteById(portfolioStock.getId());
        Optional<PortfolioStockEntity> result = underTest.findById(portfolioStock.getId());
        assertThat(result).isEmpty();
    }

}
