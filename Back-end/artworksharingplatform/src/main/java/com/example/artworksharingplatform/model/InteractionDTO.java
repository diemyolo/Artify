package com.example.artworksharingplatform.model;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.Comment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InteractionDTO {
    private UUID postId;
    private List<Comment> comments;
    private Boolean isLiked;
    private UUID userId;
    private String name;
}
