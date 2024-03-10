package com.example.artworksharingplatform.model;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDTO {
    private UUID userId;
    private float totalMoney;
    private Timestamp transactionDate;
    private String description;
}
