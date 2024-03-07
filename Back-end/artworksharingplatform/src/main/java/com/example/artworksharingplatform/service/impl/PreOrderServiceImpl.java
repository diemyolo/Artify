package com.example.artworksharingplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.repository.PreOrderRepository;
import com.example.artworksharingplatform.service.PreOrderService;

@Service
public class PreOrderServiceImpl implements PreOrderService {
    @Autowired
    PreOrderRepository _preOrderRepo;

    @Override
    public void addPreOrder(PreOrder preOrderRequest) throws Exception {
        try {
            _preOrderRepo.save(preOrderRequest);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}