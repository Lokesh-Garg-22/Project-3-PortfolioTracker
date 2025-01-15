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
import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import jakarta.transaction.Transactional;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class StockRepositoryIntegrationTests {

    private StockRepository underTest;

    @Autowired
    public StockRepositoryIntegrationTests(StockRepository underTest) {
        this.underTest = underTest;
    }

    @Test
    @Transactional
    public void testThatStockCanBeCreatedAndRecalled() {
        StockEntity stock = TestDataUtil.createTestStockEntityA();
        underTest.save(stock);

        Optional<StockEntity> result = underTest.findById(stock.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(stock);
    }

    @Test
    @Transactional
    public void testThatStockCanBeUpdated() {
        StockEntity stock = TestDataUtil.createTestStockEntityA();
        underTest.save(stock);

        stock.setName("Stock Updated");
        underTest.save(stock);
        Optional<StockEntity> result = underTest.findById(stock.getId());
        assertThat(result).isPresent();
        assertThat(result.get()).isEqualTo(stock);
    }

    @Test
    @Transactional
    public void testThatStockCanBeDeleted() {
        StockEntity stock = TestDataUtil.createTestStockEntityA();
        underTest.save(stock);
        underTest.deleteById(stock.getId());
        Optional<StockEntity> result = underTest.findById(stock.getId());
        assertThat(result).isEmpty();
    }

}
