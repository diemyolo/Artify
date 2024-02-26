package com.example.artworksharingplatform.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
    @GetMapping
    public String get() {
        return "GET::admin controller";
    }
    @PostMapping
    public String post() {
        return "POST::admin controller";
    }

    @PutMapping
    public String put() {
        return "PUT::admin controller";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE::admin controller";
    }
}
