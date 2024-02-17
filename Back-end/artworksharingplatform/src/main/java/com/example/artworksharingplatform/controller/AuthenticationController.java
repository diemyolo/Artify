package com.example.artworksharingplatform.controller;

import com.example.artworksharingplatform.model.AuthenticationRequest;
import com.example.artworksharingplatform.model.AuthenticationResponse;
import com.example.artworksharingplatform.model.RegisterRequest;
import com.example.artworksharingplatform.service.JWTServices.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(service.register(registerRequest));
    }

    @PostMapping("/login")

    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authRequest) {
        try {
            return ResponseEntity.ok(service.authenticate(authRequest));
        } catch (Exception exception) {
            ErrorDTO errorDTO = new ErrorDTO();
            errorDTO.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.toString());
            errorDTO.setErrorMessage("An error occurred while processing the login request.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDTO);
        }

    }

}
