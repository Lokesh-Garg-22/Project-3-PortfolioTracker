package com.lokesh.portfolioTracker.scheduledTasks;

import java.sql.Date;
import java.util.Calendar;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.lokesh.portfolioTracker.domain.entities.StockEntity;
import com.lokesh.portfolioTracker.services.StockService;

@Component
@PropertySource("classpath:.env")
public class ScheduledTasks {

    private static class AlphaVantageResponse extends LinkedHashMap<String, Map<String, String>> {
    }

    private static String uri(String symbol, String AlphaVantageKey) {
        return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey="
                + AlphaVantageKey;
    }

    private List<StockEntity> stockEntities = new LinkedList<>();

    @Value("${ALPHAVANTAGE_KEY}")
    private String AlphaVantageKey;

    @Value("${spring.profiles.active:production}")
    private String activeProfile;

    private StockService stockService;

    public ScheduledTasks(StockService stockService) {
        this.stockService = stockService;
    }

    @Scheduled(initialDelay = 0)
    public void setupStocks() {
        if (stockEntities.size() == 0) {
            stockEntities.add(StockEntity.builder().symbol("AAPL").name("Apple Inc.").build());
            stockEntities.add(StockEntity.builder().symbol("NVDA").name("NVIDIA Corporation").build());
            stockEntities.add(StockEntity.builder().symbol("INTC").name("Intel Corporation").build());
            stockEntities.add(StockEntity.builder().symbol("AMZN").name("Amazon.com, Inc.").build());
            stockEntities.add(StockEntity.builder().symbol("GOOGL").name("Alphabet Inc.").build());
            stockEntities.add(StockEntity.builder().symbol("UBER").name("Uber Technologies, Inc.").build());
        }

        for (int i = 0; i < stockEntities.size(); i++) {
            StockEntity stockEntity = stockEntities.get(i);
            if (!stockService.stockExists(stockEntity.getSymbol())) {
                stockEntities.set(i, stockService.createUpdateStock(stockEntity.getId(), stockEntity));
            }
        }

        // updateStocks(); // [ ]
    }

    // @Scheduled(cron = "0 0 0 * * *") // [ ]
    public void updateStocks() {
        if (AlphaVantageKey.isEmpty())
            return;
        if ("test".equals(activeProfile))
            return;

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add(
                "user-agent",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        for (int i = 0; i < stockEntities.size(); i++) {
            StockEntity stockEntity = stockEntities.get(i);
            Optional<StockEntity> stockEntityFound = stockService.findStock(stockEntity.getSymbol());
            if (stockEntityFound.isPresent()) {
                stockEntity = stockEntityFound.get();

                ResponseEntity<AlphaVantageResponse> response = restTemplate.exchange(
                        uri(stockEntity.getSymbol(), AlphaVantageKey),
                        HttpMethod.GET,
                        entity,
                        AlphaVantageResponse.class);

                Float price = Float.parseFloat(
                        response.getBody().get("Global Quote").get("05. price"));

                stockEntity.setPrice(price);
                stockEntity.setLastUpdated(new Date(Calendar.getInstance().getTimeInMillis()));

                stockService.createUpdateStock(stockEntity.getId(), stockEntity);
                stockEntities.set(i, stockEntity);
            }
        }
    }
}
