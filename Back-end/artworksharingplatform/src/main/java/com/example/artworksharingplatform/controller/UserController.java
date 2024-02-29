package com.example.artworksharingplatform.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.mapper.UserMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.UserDTO;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.CloudinaryService;
import com.example.artworksharingplatform.service.impl.UserServiceImpl;

@RestController
@RequestMapping("api/auth")
@PreAuthorize("hasRole('ROLE_AUDIENCE') or hasRole('ROLE_CREATOR') or hasRole('ROLE_ADMIN')")
public class UserController {
    @Autowired
    UserMapper userMapper;

    @Autowired
    UserServiceImpl userServiceImpl;

    @Autowired
    UserRepository _userRepository;

    @Autowired
    CloudinaryService cloudinaryService;
    @GetMapping("user/profile")
    public ResponseEntity<ApiResponse> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ApiResponse apiResponse = new ApiResponse();
        if (isUserAuthenticated(authentication)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername(); // getUserName này là email
            Optional<User> userOptional = _userRepository.findByEmailAddress(email);
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

    private boolean isUserAuthenticated(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof UserDetails;
    }
    @PutMapping("user/profile")
    public ResponseEntity<ApiResponse> updateUser(@RequestPart(value = "user") UserDTO updatedUser,
            @RequestPart(value = "image", required = false) MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ApiResponse apiResponse = new ApiResponse();
        if (isUserAuthenticated(authentication)) {
            try {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String email = userDetails.getUsername(); // getUserName này là email
                updatedUser.setImagePath(null);
                if (file != null) {
                    updatedUser.setImagePath(uploadImage(file));
                }
                updatedUser.setEmailAddress(email);
                UserDTO user = userServiceImpl.updateUser(updatedUser);
                apiResponse.ok(user);
                return ResponseEntity.ok(apiResponse);
            } catch (Exception ex) {
                apiResponse.error(ex.getMessage());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiResponse);
        }
    }

    public String uploadImage(MultipartFile file) {
        Map data = cloudinaryService.upload(file);
        String url = data.get("url").toString();
        return url;
    }

    @GetMapping("/hello")
    public String testUser() {
        return "Hello";
    }
}