package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.mapper.TransactionMapper;
import com.example.artworksharingplatform.model.TransactionDTO;
import com.example.artworksharingplatform.repository.TransactionRepository;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.TransactionService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TransactionServiceImpl implements TransactionService {

	float adminRate = 0.037f;
	float creatorRate = 0.963f;

	@Autowired
	TransactionRepository repo;

	@Autowired
	TransactionMapper transactionMapper;

	@Autowired
	UserRepository userRepository;

	@Override
	public List<Transaction> getTransactionsByUserId(UUID userId) {
		// TODO Auto-generated method stub
		return repo.findByUser_id(userId);
	}

	@Override
	public Transaction addTransaction(Transaction transaction) {
		return repo.save(transaction);
	}

	@Override
	public TransactionDTO getTransactionById(UUID id) {
		Transaction trans = repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Transaction Not Found"));
		TransactionDTO result = transactionMapper.toTransactionDTO(trans);
		return result;
	}

	@Override
	public Transaction addTransactionOrderAdmin(Order order, float totalMoney) {
		Role role = Role.ADMIN;
		User admin = userRepository.findByRole(role);

		Transaction transaction = new Transaction();
		transaction.setTotalMoney(totalMoney * adminRate);
		transaction.setUser(admin);
		transaction.setTransactionDate(order.getOrderDate());
		return repo.save(transaction);
	}

	@Override
	public Transaction addTransactionOrderCreator(Order order, float totalMoney) {
		Transaction transaction = new Transaction();
		transaction.setTotalMoney(totalMoney * creatorRate);
		transaction.setUser(order.getArtwork().getPosts().getCreator());
		transaction.setTransactionDate(order.getOrderDate());
		return repo.save(transaction);
	}

	@Override
	public Transaction addTransactionOrderAudience(Order order, float totalMoney) {
		Transaction transaction = new Transaction();
		transaction.setTotalMoney(totalMoney);
		transaction.setUser(order.getAudience());
		transaction.setTransactionDate(order.getOrderDate());
		return repo.save(transaction);
	}

	@Override
	public Transaction addTransactionPreOrderAdmin(PreOrder order, float totalMoney) {
		Role role = Role.ADMIN;
		User admin = userRepository.findByRole(role);

		Transaction transaction = new Transaction();
		transaction.setTotalMoney(totalMoney * adminRate);
		transaction.setUser(admin);
		transaction.setTransactionDate(order.getPreOrderDate());
		return repo.save(transaction);
	}

	@Override
	public Transaction addTransactionPreOrderCreator(PreOrder order, float totalMoney) {
		Transaction transaction = new Transaction();
		transaction.setTotalMoney(totalMoney * creatorRate);
		transaction.setUser(order.getPreOrderCreator());
		transaction.setTransactionDate(order.getPreOrderDate());
		return repo.save(transaction);
	}

	@Override
	public Transaction addTransactionPreOrderAudience(PreOrder order, float totalMoney) {
		Transaction transaction = new Transaction();
		transaction.setTotalMoney(totalMoney);
		transaction.setUser(order.getPreOrderAudience());
		transaction.setTransactionDate(order.getPreOrderDate());
		return repo.save(transaction);
	}

}
