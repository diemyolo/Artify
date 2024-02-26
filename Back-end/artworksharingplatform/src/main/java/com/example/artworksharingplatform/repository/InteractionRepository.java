package com.example.artworksharingplatform.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.Interaction;

public interface InteractionRepository extends JpaRepository<Interaction, UUID> {
    List<Interaction> findByInteractionPost_Id(UUID postId);
}
