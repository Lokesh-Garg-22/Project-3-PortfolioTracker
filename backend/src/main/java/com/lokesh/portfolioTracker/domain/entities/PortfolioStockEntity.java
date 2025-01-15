package com.lokesh.portfolioTracker.domain.entities;

import lombok.Data;
import lombok.Builder;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "portfolioStocks")
public class PortfolioStockEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "portfolioStock_id_seq")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "stockId")
    private StockEntity stock;

    @ManyToOne()
    @JoinColumn(name = "userId")
    private UserEntity user;

    private Number Quantity;

}
