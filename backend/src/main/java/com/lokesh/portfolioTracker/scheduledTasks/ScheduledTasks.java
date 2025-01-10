package com.lokesh.portfolioTracker.scheduledTasks;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.services.StockService;

@Component
public class ScheduledTasks {

    private StockEntity stockEntity1 = StockEntity.builder().symbol("AAPL").name("Apple Inc.").build();
    private StockEntity stockEntity2 = StockEntity.builder().symbol("NVDA").name("NVIDIA Corporation").build();
    private StockEntity stockEntity3 = StockEntity.builder().symbol("INTC").name("Intel Corporation").build();
    private StockEntity stockEntity4 = StockEntity.builder().symbol("AMZN").name("Amazon.com, Inc.").build();
    private StockEntity stockEntity5 = StockEntity.builder().symbol("GOOGL").name("Alphabet Inc.").build();
    private StockEntity stockEntity6 = StockEntity.builder().symbol("UBER").name("Uber Technologies, Inc.").build();

    private StockService stockService;

    public ScheduledTasks(StockService stockService) {
        this.stockService = stockService;
    }

    @Scheduled(initialDelay = 0)
    public void setupStocks() {
        if (!stockService.stockExists(stockEntity1.getSymbol()))
            stockService.createStock(stockEntity1);

        if (!stockService.stockExists(stockEntity2.getSymbol()))
            stockService.createStock(stockEntity2);

        if (!stockService.stockExists(stockEntity3.getSymbol()))
            stockService.createStock(stockEntity3);

        if (!stockService.stockExists(stockEntity4.getSymbol()))
            stockService.createStock(stockEntity4);

        if (!stockService.stockExists(stockEntity5.getSymbol()))
            stockService.createStock(stockEntity5);

        if (!stockService.stockExists(stockEntity6.getSymbol()))
            stockService.createStock(stockEntity6);

        updateStocks();
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void updateStocks() {
        System.out.println(stockService.stocks());
        // TODO
    }
}
