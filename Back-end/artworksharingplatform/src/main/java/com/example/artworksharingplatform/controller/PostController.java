package com.example.artworksharingplatform.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.mapper.PostMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.PostDTO;
import com.example.artworksharingplatform.service.ArtworkService;
import com.example.artworksharingplatform.service.PostService;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping
public class PostController  {

	@Autowired
	PostService postService;

	@Autowired
	PostMapper postMapper;

	@Autowired
	ArtworkService artworkService;

	@GetMapping("api/auth/viewAll")
	public ResponseEntity<ApiResponse> viewAllPosts() {
		ApiResponse apiResponse = new ApiResponse();
		try {
			List<Post> posts = postService.getAllPosts();
			List<PostDTO> postDTOs = postMapper.toList(posts);
			apiResponse.ok(posts);
			return ResponseEntity.ok(apiResponse);
		} catch (Exception e) {
			apiResponse.error(e);
			return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
		}
		// List<Post> posts = postService.getAllPosts();
		// return posts;
	}

	@GetMapping("api/auth/viewAllArt")
	public List<Artworks> viewArts() {
		ApiResponse apiResponse = new ApiResponse();
		List<Artworks> artworks = new ArrayList<Artworks>();
		try{
			artworks = artworkService.getAllArtworks();
			// apiResponse.ok(artworks);
		}catch(Exception e){
			e.printStackTrace();
			// apiResponse.error(e);
			// return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
		}
		return artworks;
	}

	
	@GetMapping("api/auth/creator/test")
	@PreAuthorize("hasRole('ROLE_CREATOR')")
	public String viewAll() {
		List<Post> posts = postService.getAllPosts();
		return posts.get(0).getDescription();
	}

	@GetMapping("/test1")
	public String viewAll1() {
		List<Post> posts = postService.getAllPosts();
		return "a";
	}

}
