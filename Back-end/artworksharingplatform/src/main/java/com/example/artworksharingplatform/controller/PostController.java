package com.example.artworksharingplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.mapper.PostMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.PostDTO;
import com.example.artworksharingplatform.service.ArtworkService;
import com.example.artworksharingplatform.service.CloudinaryService;
import com.example.artworksharingplatform.service.PostService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("api/auth/creator/post")
public class PostController {

	@Autowired
	PostService postService;

	@Autowired
	PostMapper postMapper;

	@Autowired
	ArtworkService artworkService;


	@Autowired
    private CloudinaryService cloudinaryService;
	@GetMapping("api/auth/viewAll")
	public ResponseEntity<ApiResponse> viewAllPosts() {
		ApiResponse apiResponse = new ApiResponse();
		try {
			List<Post> posts = postService.getAllPosts();
			List<PostDTO> postDTOs = postMapper.toList(posts);
			apiResponse.ok(postDTOs);
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
		}catch(Exception e){
			e.printStackTrace();
			
		}
		return artworks;
	}


	@GetMapping("api/auth/creator/test")
	@PreAuthorize("hasRole('ROLE_CREATOR')")
	public String viewAll() {
		List<Post> posts = postService.getAllPosts();
		return posts.get(0).getDescription();
	}

	@PostMapping("api/auth/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file){
        Map data = cloudinaryService.upload(file);
        String url = data.get("url").toString();
        return  ResponseEntity.ok(url);
    }

}
