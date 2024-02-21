package com.example.artworksharingplatform.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.artworksharingplatform.entity.Artworks;


public interface ArtworkRepository extends JpaRepository<Artworks, UUID>   {
	
}
