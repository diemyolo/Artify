package com.example.artworksharingplatform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.entity.User;

@Service
public interface PreOrderService {
    public void addPreOrder(PreOrder preOrderRequest) throws Exception;

    public List<PreOrder> getCreatorPreOrderList(User preOrderCreator) throws Exception;
}
