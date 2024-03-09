package com.example.artworksharingplatform.model;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class TransactionDTO {
	
	public UUID transactionId;
	public Timestamp transactionDate;
	public float totalMoney;
	public float inputMoney;
	
}
