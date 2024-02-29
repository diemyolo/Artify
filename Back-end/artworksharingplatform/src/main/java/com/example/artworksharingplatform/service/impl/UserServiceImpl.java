package com.example.artworksharingplatform.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.model.UserDTO;

/**
 * UserServiceImpl
 */
@Service
public interface UserServiceImpl {
    UserDTO updateUser(UserDTO updatedUser);

    UserDTO getUserInfo(UUID userId);


    User findUserByJwt(String jwt);

    String extractBearerToken(String bearerToken);

    User ChangeCreatorStatus(String email) throws Exception;

    UserDTO findByEmailAddress(String email);

}