package com.example.artworksharingplatform.service.impl;

import com.example.artworksharingplatform.entity.PreOrder;
import org.springframework.stereotype.Service;

@Service
public interface PreOrderServiceImpl  {
    public void addPreOrder(PreOrder preOrderRequest) throws Exception;
}
