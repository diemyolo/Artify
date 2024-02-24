package com.example.artworksharingplatform.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.mapper.PostMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.PostDTO;
import com.example.artworksharingplatform.service.PostService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/auth/creator/post")
public class PostController  {
	
	@Autowired
	PostService postService;

	@Autowired
	PostMapper postMapper;

	@GetMapping("/viewAll")
	@PreAuthorize("hasRole('ROLE_CREATOR')")
	public ResponseEntity<ApiResponse> viewAllPosts() {
		ApiResponse apiResponse = new ApiResponse();
		try{
			List<Post> posts = postService.getAllPosts();
			List<PostDTO> postDTOs = postMapper.toList(posts);
			apiResponse.ok(postDTOs);
			return ResponseEntity.ok(apiResponse);
		}catch(Exception e){
			apiResponse.error(e);
			return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
		}
		// List<Post> posts = postService.getAllPosts();
		// return posts;
	}

	
}
