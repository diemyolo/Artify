package com.example.artworksharingplatform.service;

import java.util.UUID;

import com.example.artworksharingplatform.entity.EWallet;

public interface EWalletService {
	public void createWallet(EWallet eWallet);

	public EWallet getWalletByUserId(UUID userId);

	public void updateWallet(EWallet eWallet);

	public boolean isEnoughMoney(UUID userId, float price);
}
