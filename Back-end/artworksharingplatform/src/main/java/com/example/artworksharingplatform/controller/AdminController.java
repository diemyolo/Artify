package com.example.artworksharingplatform.controller;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.PostService;
import com.example.artworksharingplatform.service.UserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.mapper.UserMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.UserDTO;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.AdminService;
import com.example.artworksharingplatform.service.CloudinaryService;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @Autowired
    UserService _userService;
    @Autowired
    PostService _postService;
    @Autowired
    UserMapper userMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AdminService adminService;

    @Autowired
    CloudinaryService cloudinaryService;

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

    @PutMapping("user/profile")
    public ResponseEntity<ApiResponse> updateUser(@RequestPart(value = "user") UserDTO updatedUser,
            @RequestPart(value = "image", required = false) MultipartFile file) {
        ApiResponse apiResponse = new ApiResponse();
        if (updatedUser != null) {
            try {
                updatedUser.setImagePath(null);
                if (file != null) {
                    updatedUser.setImagePath(uploadImage(file));
                }
                UserDTO user = adminService.updateUser(updatedUser);
                apiResponse.ok(user);
                return ResponseEntity.ok(apiResponse);
            } catch (Exception ex) {
                apiResponse.error(ex.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
        }
    }

    public String uploadImage(MultipartFile file) {
        Map data = cloudinaryService.upload(file);
        String url = data.get("url").toString();
        return url;
    }

    @GetMapping("user/profile")
    public ResponseEntity<ApiResponse> getUserInfo(@RequestParam UUID userId) {
        ApiResponse apiResponse = new ApiResponse();
        if (userId != null) {
            Optional<User> userOptional = userRepository.findById(userId);
            UserDTO userInfo;
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                userInfo = userMapper.toUserDTO(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
            }
            apiResponse.ok(userInfo);
            return ResponseEntity.ok(apiResponse);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
        }
    }

    @GetMapping("user/list")
    public ResponseEntity<ApiResponse> viewAllUsers() {
        ApiResponse apiResponse = new ApiResponse();
        try {
            List<UserDTO> userlist = adminService.viewAllUsers();
            apiResponse.ok(userlist);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            apiResponse.error(e);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

}
