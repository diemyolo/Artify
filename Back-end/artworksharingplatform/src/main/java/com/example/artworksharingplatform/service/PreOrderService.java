package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.PreOrderDTO;
import com.example.artworksharingplatform.model.ProcessingRequest;

@Service
public interface PreOrderService {
    void addPreOrder(PreOrder preOrderRequest) throws Exception;

    List<PreOrder> getCreatorPreOrderList(User preOrderCreator) throws Exception;

    List<PreOrder> getWaitingPreOrderList(User preOrderCustomer) throws Exception;

    int countByPreOrderCreator(User preOrderCreator);

    PreOrder updatePreOrderCreator(PreOrderDTO updatedPreOrderDTO, Artworks updatedArtwork) throws Exception;

    PreOrder processingPreOrderAudience(ProcessingRequest request) throws Exception;

    PreOrder completePreOrderAudience(UUID preOrderId) throws Exception;
}
