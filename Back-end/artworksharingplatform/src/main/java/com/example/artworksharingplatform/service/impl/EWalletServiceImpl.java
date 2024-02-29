package com.example.artworksharingplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.artworksharingplatform.entity.EWallet;
import com.example.artworksharingplatform.repository.EWalletRepository;
import com.example.artworksharingplatform.service.EWalletService;

public class EWalletServiceImpl implements EWalletService{

	@Autowired
	EWalletRepository eWalletRepository;

	@Override
	public void addMoneyToEwallet(EWallet eWallet) {

		eWalletRepository.save(eWallet);
		
	}
	
	
} 
