package com.example.artworksharingplatform.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.entity.Role;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmailAddress(String emailAddress);

    User findByRole(Role role);

    List<User> findByNameContainingIgnoreCase(String name);

    List<User> findAllByRole(Role role);
}
