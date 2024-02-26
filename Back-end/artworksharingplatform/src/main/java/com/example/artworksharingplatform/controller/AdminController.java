package com.example.artworksharingplatform.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
//@SecurityRequirement(name = "bearerAuth")
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
