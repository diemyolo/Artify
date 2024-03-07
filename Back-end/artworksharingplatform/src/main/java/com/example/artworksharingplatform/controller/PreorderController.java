package com.example.artworksharingplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.service.CloudinaryService;
import com.example.artworksharingplatform.service.impl.UserServiceImpl;

/**
 * CreatorController
 */
@RestController
@RequestMapping("api/auth")
@PreAuthorize("hasRole('ROLE_CREATOR')")
public class PreorderController {
    @Autowired

    @Autowired
    CloudinaryService cloudinaryService;

    }
