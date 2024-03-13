package com.example.artworksharingplatform.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.PreOrderDTO;
import com.example.artworksharingplatform.repository.PreOrderRepository;
import com.example.artworksharingplatform.service.PreOrderService;

import jakarta.persistence.EntityNotFoundException;

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

    @Override
    public List<PreOrder> getCreatorPreOrderList(User preOrderCreator) throws Exception {
        try {
            List<PreOrder> preOrderList = _preOrderRepo.findByPreOrderCreator(preOrderCreator);
            return preOrderList;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public int countByPreOrderCreator(User preOrderCreator) {
        return _preOrderRepo.countByPreOrderCreator(preOrderCreator);
    }

    @Override
    public PreOrder updatePreOrderCreator(PreOrderDTO updatedPreOrderDTO, Artworks updatedArtwork) throws Exception {
        try {
            PreOrder preOrderToChange = _preOrderRepo.findById(updatedPreOrderDTO.getPreOrderId())
                    .orElseThrow(() -> new EntityNotFoundException("PreOrder not found"));
            preOrderToChange.setCreatorNote(updatedPreOrderDTO.getCreatorNote());
            preOrderToChange.setPrice(updatedPreOrderDTO.getPrice());
            preOrderToChange.setStatus(updatedPreOrderDTO.getStatus().toUpperCase());
            if (updatedArtwork != null) {
                preOrderToChange.setPreOrderArtwork(updatedArtwork);
            }
            _preOrderRepo.save(preOrderToChange);
            return preOrderToChange;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}