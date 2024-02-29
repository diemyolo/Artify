package com.example.artworksharingplatform.service.impl;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Comment;
import com.example.artworksharingplatform.repository.CommentRepository;
import com.example.artworksharingplatform.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentRepository commentRepository;

    @SuppressWarnings("null")
    @Override
    public Comment getCommentById(UUID commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment comment = optionalComment.orElse(null);
        return comment;
    }

    @Override
    public Comment addOrEditComment(UUID userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addComment'");
    }

    @SuppressWarnings("null")
    @Override
    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }

}
