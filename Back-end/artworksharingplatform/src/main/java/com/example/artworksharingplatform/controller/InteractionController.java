package com.example.artworksharingplatform.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.Interaction;
import com.example.artworksharingplatform.mapper.InteractionMapper;
import com.example.artworksharingplatform.model.InteractionDTO;
import com.example.artworksharingplatform.service.InteractionService;

@RestController
@RequestMapping("api/auth/audience")
public class InteractionController {

    @Autowired
    InteractionService interactionService;

    @Autowired
    InteractionMapper interactionMapper;

    @GetMapping("post/{postId}")
    @PreAuthorize("hasRole('ROLE_AUDIENCE')")
    public ResponseEntity<List<InteractionDTO>> getInteractionByPostId(@PathVariable UUID postId) {
        try {
            List<Interaction> interactions = interactionService.getInteractionsByPostId(postId);
            List<InteractionDTO> interactionDTOs = interactionMapper.toInteractionDTOList(interactions);

            return new ResponseEntity<>(interactionDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // @PostMapping("/post/addInteract")
    // public ResponseEntity<InteractionDTO> addInteraction(@RequestBody
    // InteractionDTO interactionDTO) {
    // try {
    // Interaction interaction = interactionService.addInteraction(interactionDTO);
    // InteractionDTO interactDTO = interactionMapper.toInteractionDTO(interaction);

    // return new ResponseEntity<>(interactDTO, HttpStatus.CREATED);
    // } catch (Exception e) {
    // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    // }
    // }
}
