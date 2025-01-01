package com.lokesh.portfolioTracker.domain.entities;

import lombok.Data;
import lombok.Builder;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "stocks")
public class StockEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stock_id_seq")
    private Long id;

    private String name;

    private String symbol;

    @Builder.Default
    private Number price = 0;

    private Date lastUpdated;

}
