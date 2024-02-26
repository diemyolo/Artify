package com.example.artworksharingplatform.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmailAddress(String emailAddress);
}
