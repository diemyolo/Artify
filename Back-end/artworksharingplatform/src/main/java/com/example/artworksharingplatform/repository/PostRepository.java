package com.example.artworksharingplatform.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {

}
