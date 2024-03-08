package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Transaction;

@Service
public interface TransactionService {
	public List<Transaction> getTransactionsByUserId(UUID userId);
	public void addTransaction(Transaction transaction);	
} 
