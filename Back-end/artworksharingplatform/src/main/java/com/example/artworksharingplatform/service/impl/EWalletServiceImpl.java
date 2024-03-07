package com.example.artworksharingplatform.service.impl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.EWallet;
import com.example.artworksharingplatform.repository.EWalletRepository;
import com.example.artworksharingplatform.service.EWalletService;

@Service
public class EWalletServiceImpl implements EWalletService{

	@Autowired
	EWalletRepository eWalletRepository;

	@Override
	public void createWallet(EWallet eWallet) {
		eWalletRepository.save(eWallet);
		
	}

	@Override
	public EWallet getWalletByUserId(UUID userId) {
		return eWalletRepository.findByUser_Id(userId);
	}

	@Override
	public void updateWallet(EWallet eWallet) {
		// TODO Auto-generated method stub
			eWalletRepository.save(eWallet);
		
	}
	
	
} 
