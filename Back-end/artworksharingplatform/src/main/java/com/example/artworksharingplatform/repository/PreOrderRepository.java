package com.example.artworksharingplatform.repository;

import com.example.artworksharingplatform.entity.PreOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PreOrderRepository extends JpaRepository<PreOrder, UUID> {
}
