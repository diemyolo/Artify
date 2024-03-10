package com.example.artworksharingplatform.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.UserDTO;

/**
 * UserServiceImpl
 */
@Service
public interface UserService {
    UserDTO updateUser(UserDTO updatedUser);

    UserDTO getUserInfo(UUID userId);

    User getUserById(UUID userId);

    UserDTO findByEmailAddress(String email);

    User findByEmail(String email);

    User getUser(UUID userId);
}