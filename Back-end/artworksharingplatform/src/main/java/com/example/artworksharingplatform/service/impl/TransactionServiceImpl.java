package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Transaction;
import com.example.artworksharingplatform.repository.TransactionRepository;
import com.example.artworksharingplatform.service.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService{

	@Autowired
	TransactionRepository repo;

	@Override
	public List<Transaction> getTransactionsByUserId(UUID userId) {
		// TODO Auto-generated method stub
		return repo.findByUser_id(userId);
	}

	@Override
	public void addTransaction(Transaction transaction) {
		repo.save(transaction);
	}
	
}
