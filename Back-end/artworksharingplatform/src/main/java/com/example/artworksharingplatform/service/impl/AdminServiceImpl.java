package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.mapper.UserMapper;
import com.example.artworksharingplatform.model.UserDTO;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.AdminService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminServiceImpl implements AdminService {
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
            if (updatedUser.getStatus() != null && !updatedUser.getStatus().isEmpty()) {
                userToUpdate.setStatus(updatedUser.getStatus());
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
    public List<UserDTO> viewAllUsers() {
        List<User> userList = userRepository.findAll();
        return userMapper.toList(userList);
    }

    @Override
    public UserDTO findByEmailAddress(String email) {
        User user = userRepository.findByEmailAddress(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.toUserDTO(user);
    }
}
