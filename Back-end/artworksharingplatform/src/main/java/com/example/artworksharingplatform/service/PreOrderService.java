package com.example.artworksharingplatform.service;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.PreOrder;

@Service
public interface PreOrderService {
    public void addPreOrder(PreOrder preOrderRequest) throws Exception;
}
