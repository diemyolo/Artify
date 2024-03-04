package com.example.artworksharingplatform.service.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.UserDTO;

/**
 * UserServiceImpl
 */
@Service
public interface UserServiceImpl {
    UserDTO updateUser(UserDTO updatedUser);

    UserDTO getUserInfo(UUID userId);

    User ChangeCreatorStatus(String email) throws Exception;

    UserDTO findByEmailAddress(String email);

    User getUser(UUID userId);
}