package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Interaction;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.InteractionDTO;
import com.example.artworksharingplatform.repository.InteractionRepository;
import com.example.artworksharingplatform.repository.PostRepository;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.InteractionService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class InteractionServiceImpl implements InteractionService {

    @Autowired
    InteractionRepository interactionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Override
    public List<Interaction> getInteractionsByPostId(UUID postId) {
        List<Interaction> interactionsList = interactionRepository.findByInteractionPost_Id(postId);
        return interactionsList;
    }

    @Override
    public Interaction addInteraction(InteractionDTO interactionDTO) {
        User user = userRepository.findById(interactionDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Post post = postRepository.findById(interactionDTO.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        Interaction interaction = new Interaction();
        interaction.setComment(interactionDTO.getComment());
        interaction.setIsLiked(interactionDTO.getIsLiked());
        interaction.setInteractionAudience(user);
        interaction.setInteractionPost(post);

        return interactionRepository.save(interaction);
    }
}
