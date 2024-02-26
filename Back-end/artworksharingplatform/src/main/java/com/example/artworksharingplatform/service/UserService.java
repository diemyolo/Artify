package com.example.artworksharingplatform.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.mapper.UserMapper;
import com.example.artworksharingplatform.model.UserDTO;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.JWTServices.JWTService;
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

    @Autowired
    JWTService jwtService;

    @Override
    public UserDTO updateUser(String jwt, UserDTO updatedUser) {
        User userToUpdate = findUserByJwt(jwt);
        if (userToUpdate.getEmailAddress().equals(updatedUser.getEmailAddress())) {
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
        } else {
            throw new EntityNotFoundException("User not found");
        }
    }

    @Override
    public UserDTO getUserInfo(UUID userId) {
        User userToFind = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userMapper.toUserDTO(userToFind);
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = jwtService.GetUserEmailJWT(extractBearerToken(jwt));
        User user = userRepository.findByEmailAddress(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return user;
    }

    public String extractBearerToken(String bearerToken) {
        String[] parts = bearerToken.split(" ");
        if (parts.length == 2) {
            return parts[1];
        } else {
            throw new IllegalArgumentException("Invalid JWT string format");
        }
    }
}