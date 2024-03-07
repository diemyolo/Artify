package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.PreOrder;

@Service
public interface PreOrderService {
    List<PreOrder> getCreatorPreOrderList(UUID creatorID);
}
