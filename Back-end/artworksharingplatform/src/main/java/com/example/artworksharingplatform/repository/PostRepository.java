package com.example.artworksharingplatform.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {
	
} 
