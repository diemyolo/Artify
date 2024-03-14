package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.PreOrder;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Order;
import com.example.artworksharingplatform.entity.Transaction;
import com.example.artworksharingplatform.model.TransactionDTO;

@Service
public interface TransactionService {
	public List<Transaction> getTransactionsByUserId(UUID userId);

	public Transaction addTransaction(Transaction transaction);

	public TransactionDTO getTransactionById(UUID id);

	public Transaction addTransactionOrderAdmin(Order order, float totalMoney);

	public Transaction addTransactionOrderCreator(Order order, float totalMoney);

	public Transaction addTransactionOrderAudience(Order order, float totalMoney);
	public Transaction addTransactionPreOrderAdmin(PreOrder order, float totalMoney);

	public Transaction addTransactionPreOrderCreator(PreOrder order, float totalMoney);

	public Transaction addTransactionPreOrderAudience(PreOrder order, float totalMoney);
}
