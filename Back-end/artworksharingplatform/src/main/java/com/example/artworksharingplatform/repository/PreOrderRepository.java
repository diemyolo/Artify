package com.example.artworksharingplatform.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.PreOrder;

public interface PreOrderRepository extends JpaRepository<PreOrder, UUID> {

}