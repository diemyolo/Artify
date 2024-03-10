package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Transaction;
import com.example.artworksharingplatform.mapper.TransactionMapper;
import com.example.artworksharingplatform.model.TransactionDTO;
import com.example.artworksharingplatform.repository.TransactionRepository;
import com.example.artworksharingplatform.service.TransactionService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TransactionServiceImpl implements TransactionService{

	@Autowired
	TransactionRepository repo;

	@Autowired
	TransactionMapper transactionMapper;

	@Override
	public List<Transaction> getTransactionsByUserId(UUID userId) {
		// TODO Auto-generated method stub
		return repo.findByUser_id(userId);
	}

	@Override
	public void addTransaction(Transaction transaction) {
		repo.save(transaction);
	}

	@Override
	public TransactionDTO getTransactionById(UUID id) {
		Transaction trans = repo.findById(id)
		.orElseThrow(() -> new EntityNotFoundException("Transaction Not Found"));
		TransactionDTO result = transactionMapper.toTransactionDTO(trans);
		return result;
	}
	
}
