package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.Interaction;
import com.example.artworksharingplatform.model.InteractionDTO;

public interface InteractionService {
    public List<Interaction> getInteractionsByPostId(UUID postId);

    // public Interaction addInteraction(InteractionDTO interactionDTO);
}
