package com.example.artworksharingplatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.repository.ArtworkRepository;
import com.example.artworksharingplatform.service.impl.ArtworkServiceImpl;

@Service
public class ArtworkService implements ArtworkServiceImpl{

	@Autowired
	ArtworkRepository artworkRepository;
	@Override
	public List<Artworks> getAllArtworks() {
		// TODO Auto-generated method stub
		List<Artworks> list = artworkRepository.findAll();
		return list;
	}
	
}
