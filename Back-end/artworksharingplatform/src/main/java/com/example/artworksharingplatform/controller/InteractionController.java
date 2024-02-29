package com.example.artworksharingplatform.controller;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.CommentDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.Comment;
import com.example.artworksharingplatform.entity.Interaction;
import com.example.artworksharingplatform.mapper.CommentMapper;
import com.example.artworksharingplatform.mapper.InteractionMapper;
import com.example.artworksharingplatform.model.InteractionDTO;
import com.example.artworksharingplatform.service.CommentService;
import com.example.artworksharingplatform.service.InteractionService;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/auth")
public class InteractionController {

    @Autowired
    InteractionService interactionService;

    @Autowired
    CommentService commentService;

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    InteractionMapper interactionMapper;

    @GetMapping("post/{postId}")
    public ResponseEntity<ApiResponse<List<InteractionDTO>>> getInteractionByPostId(@PathVariable UUID postId) {
        ApiResponse<List<InteractionDTO>> apiResponse = new ApiResponse<List<InteractionDTO>>();
        try {
            List<Interaction> interactions = interactionService.getInteractionsByPostId(postId);
            List<InteractionDTO> interactionDTOs = interactionMapper.toInteractionDTOList(interactions);

            apiResponse.ok(interactionDTOs);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            apiResponse.error(e);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("user/like")
    @PreAuthorize("hasRole('ROLE_AUDIENCE') or hasRole('ROLE_CREATOR')")
    public ResponseEntity<ApiResponse<Interaction>> likePost(@RequestParam UUID postId, @RequestParam UUID userId) {
        ApiResponse<Interaction> apiResponse = new ApiResponse<Interaction>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (isUserAuthenticated(authentication)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();

            Interaction interaction = interactionService.likePost(postId, userId);

            apiResponse.ok(interaction);
            return ResponseEntity.ok(apiResponse);
        } else {
            return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/hi")
    @PreAuthorize("hasRole('ROLE_AUDIENCE')")
    public CommentDTO getMethodName() {
        UUID id = UUID.fromString("756BB549-329F-4C81-A41A-825AD40F1ADF");
        Comment comment = commentService.getCommentById(id);
        CommentDTO commentDTO = commentMapper.toCommentDTO(comment);
        return commentDTO;
    }

    private boolean isUserAuthenticated(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof UserDetails;
    }
}
