package com.example.artworksharingplatform.controller;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.PostService;
import com.example.artworksharingplatform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/api/auth/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
    @Autowired
    UserService _userService;
    @Autowired
    PostService _postService;

    @PutMapping("changeCreatorStatus")
    public ResponseEntity<ApiResponse<User>> ChangeCreatorStatus(@RequestHeader("CreatorEmail") String creatorEmail) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        try {
            var user = _userService.ChangeCreatorStatus(creatorEmail);
            apiResponse.ok(user);
            return ResponseEntity.ok(apiResponse);

        } catch (Exception e) {
            apiResponse.error(e);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("deletePost")
    public ResponseEntity<ApiResponse<Post>> DeletePost(@RequestHeader("PostId") UUID postId) {
        ApiResponse<Post> apiResponse = new ApiResponse<>();
        try {
            _postService.deleteArtwork(postId);
            apiResponse.ok();
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            apiResponse.error(e);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }


}
