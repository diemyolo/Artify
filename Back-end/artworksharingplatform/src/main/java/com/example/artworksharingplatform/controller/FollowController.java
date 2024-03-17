package com.example.artworksharingplatform.controller;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.service.FollowingService;
import com.example.artworksharingplatform.service.UserService;
import com.example.artworksharingplatform.service.impl.FollowingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class FollowController {
    
    @Autowired
    UserService userService;
    @Autowired
    FollowingServiceImpl _followService;

    @PostMapping("follow")
    // @PreAuthorize("hasRole('ROLE_AUDIENCE')")
    public ResponseEntity<ApiResponse<String>> following(@RequestParam("creatorMail") String creatorEmail)
            throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ApiResponse apiResponse = new ApiResponse();
        if (isUserAuthenticated(authentication)) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User audience = userService.findByEmail(email);
            User creator = userService.findByEmail(creatorEmail);
            String result = _followService.Following(audience, creator);
            apiResponse.ok(result);
            return ResponseEntity.ok(apiResponse);
        } else {
            return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("number_of_follow")
    public ResponseEntity<ApiResponse<Integer>> NumberOfFollower(@RequestParam String CreatorEmail) throws Exception {
        ApiResponse<Integer> apiResponse = new ApiResponse<>();
        try {
            User creator = userService.findByEmail(CreatorEmail);
            Integer numberOfFollower = _followService.NumOfFollowing(creator);
            apiResponse.ok(numberOfFollower);
            return ResponseEntity.ok(apiResponse);

        } catch (Exception e) {
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

    private boolean isUserAuthenticated(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof UserDetails;
    }
}
