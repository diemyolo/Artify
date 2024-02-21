package com.example.artworksharingplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.service.ArtworkService;



@RestController
@RequestMapping("/artwork")
public class ArtworkController {
	
	@Autowired
	ArtworkService artworkService;

	@GetMapping("/test")
	public String Test(){
		return "aaaa";
	}

	@GetMapping("/viewAll")
	public List<Artworks> getAllArts() {
		return artworkService.getAllArtworks();
	}
	
}
