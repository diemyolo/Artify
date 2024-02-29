package com.example.artworksharingplatform.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.mapper.UserMapper;
import com.example.artworksharingplatform.model.UserDTO;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.impl.UserServiceImpl;

import jakarta.persistence.EntityNotFoundException;

/**
 * UserService
 */
@Service
public class UserService implements UserServiceImpl {
    @Autowired
    private PasswordEncoder _passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Override
    public UserDTO updateUser(UserDTO updatedUser) {
        try {
            User userToUpdate = userRepository.findByEmailAddress(updatedUser.getEmailAddress())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));

            if (updatedUser.getUserName() != null && !updatedUser.getUserName().isEmpty()) {
                userToUpdate.setName(updatedUser.getUserName());
            }
            if (updatedUser.getTelephone() != null && !updatedUser.getTelephone().isEmpty()) {
                userToUpdate.setTelephone(updatedUser.getTelephone());
            }
            if (updatedUser.getImagePath() != null && !updatedUser.getImagePath().isEmpty()) {
                userToUpdate.setImagePath(updatedUser.getImagePath());
            }
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                userToUpdate.setPass(_passwordEncoder.encode(updatedUser.getPassword()));
            }

            userRepository.save(userToUpdate);
            return userMapper.toUserDTO(userToUpdate);
        } catch (Exception ex) {
            throw new RuntimeException("Error occurred while updating user. Please try again later.");
        }
    }

    @Override
    public UserDTO getUserInfo(UUID userId) {
        User userToFind = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.toUserDTO(userToFind);
    }

    @Override
    public UserDTO findByEmailAddress(String email) {
        User user = userRepository.findByEmailAddress(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.toUserDTO(user);
    }

    @Override
    public User ChangeCreatorStatus(String email) throws Exception {
        try {
            User user = userRepository.findByEmailAddress(email)
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            if (user != null) {
                user.setStatus("ACTIVE");
                userRepository.save(user);
            } else {
                return null;
            }
            return user;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}