package com.example.artworksharingplatform.service;

import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.repository.PreOrderRepository;
import com.example.artworksharingplatform.service.impl.PreOrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreOrderService implements PreOrderServiceImpl {
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