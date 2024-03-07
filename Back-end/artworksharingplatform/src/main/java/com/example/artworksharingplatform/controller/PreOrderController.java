package com.example.artworksharingplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.PreOrderRequest;
import com.example.artworksharingplatform.service.PreOrderService;
import com.example.artworksharingplatform.service.UserService;

@RestController
@RequestMapping("api/auth")
public class PreOrderController {
    @Autowired
    PreOrderService _preOrderService;
    @Autowired
    UserService _userService;

    @PostMapping("audience/PreOrderRequest")
    @PreAuthorize("hasRole('ROLE_AUDIENCE')")
    public ResponseEntity<?> addPreOder(PreOrderRequest preOrderRequest) {
        ApiResponse<PreOrder> apiResponse = new ApiResponse<PreOrder>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            User user = _userService.findByEmail(email);
            // validation CreatorId
            var creator = _userService.getUserById(preOrderRequest.getCreatorId());
            if (creator == null) {
                apiResponse.error("creator can not be null");
                return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
            }
            PreOrder preOrderParse = new PreOrder();
            preOrderParse.setPreOrderAudience(user);
            preOrderParse.setPreOrderCreator(creator);
            preOrderParse.setRequirement(preOrderRequest.getRequirement());
            preOrderParse.setStatus("0");
            _preOrderService.addPreOrder(preOrderParse);
            apiResponse.ok(preOrderParse);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            apiResponse.error(e);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }
}
