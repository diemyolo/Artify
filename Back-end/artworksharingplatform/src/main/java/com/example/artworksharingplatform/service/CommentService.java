package com.example.artworksharingplatform.service;

import java.util.UUID;

import com.example.artworksharingplatform.entity.Comment;

public interface CommentService {
    Comment getCommentById(UUID commentId);

    Comment addOrEditComment(UUID userId);

    void deleteComment(UUID commentId);
}
