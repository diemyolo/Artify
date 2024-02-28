package com.example.artworksharingplatform.controller;

import com.example.artworksharingplatform.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.mapper.UserMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.UserDTO;
import com.example.artworksharingplatform.service.impl.UserServiceImpl;

@RestController
@RequestMapping("api/auth")
public class UserController {
    @Autowired
    UserMapper userMapper;

    @Autowired
    UserServiceImpl userServiceImpl;
    @Autowired
    UserRepository _userRepository;

    @GetMapping("user/profile")
    @PreAuthorize("hasRole('ROLE_AUDIENCE') or hasRole('ROLE_CREATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> getUserInfo(@RequestHeader("Authorization") String jwt) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            UserDTO userInfo = userMapper.toUserDTO(userServiceImpl.findUserByJwt(jwt));
            apiResponse.ok(userInfo);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception ex) {
            apiResponse.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
        }
    }

    @GetMapping("user/profile2")
    @PreAuthorize("hasRole('ROLE_AUDIENCE') or hasRole('ROLE_CREATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> getUserInfo2() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ApiResponse apiResponse = new ApiResponse();
        if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            // Now you can use the username to fetch the user details from your repository
            var user = _userRepository.findByEmailAddress(email);
            apiResponse.ok(user);
             return ResponseEntity.ok(apiResponse);
        } else {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
        }
    }

    @PutMapping("user/profile")
    @PreAuthorize("hasRole('ROLE_AUDIENCE') or hasRole('ROLE_CREATOR') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> updateUser(@RequestHeader("Authorization") String jwt,
            @RequestBody UserDTO updatedUser) {
        ApiResponse apiResponse = new ApiResponse();
        try {
            UserDTO user = userServiceImpl.updateUser(jwt, updatedUser);
            apiResponse.ok(user);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception ex) {
            apiResponse.error(ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
        }
    }

    @GetMapping("/hello")
    public String testUser() {
        return "Hello";
    }
}