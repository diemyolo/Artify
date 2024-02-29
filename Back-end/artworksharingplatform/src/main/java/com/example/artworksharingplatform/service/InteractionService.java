package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.Interaction;

public interface InteractionService {
    public List<Interaction> getInteractionsByPostId(UUID postId);

    public Interaction likePost(UUID postId, UUID userId);
}
