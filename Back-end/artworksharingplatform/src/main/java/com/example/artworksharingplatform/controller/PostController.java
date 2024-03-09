package com.example.artworksharingplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.mapper.PostMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.ArtworkDTO;
import com.example.artworksharingplatform.model.PostDTO;
import com.example.artworksharingplatform.service.ArtworkService;
import com.example.artworksharingplatform.service.CloudinaryService;
import com.example.artworksharingplatform.service.PostService;

import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/auth")
public class PostController {

	@Autowired
	PostService postService;

	@Autowired
	PostMapper postMapper;

	@Autowired
	ArtworkService artworkService;

	@Autowired
    private CloudinaryService cloudinaryService;

	@GetMapping("audience/viewAll")
	@PreAuthorize("hasRole('ROLE_AUDIENCE') or hasRole('ROLE_CREATOR')")
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
	}

	@GetMapping("audience/viewAllArt")
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

	@PostMapping("api/auth/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file){
        Map data = cloudinaryService.upload(file);
        String url = data.get("url").toString();
        return  ResponseEntity.ok(url);
    }

	@PostMapping("addPost")
	public ResponseEntity<String> addArtwork(@RequestPart("image") List<MultipartFile> files,
	@RequestPart("post") PostDTO postDTO){
		Post savedPost = postService.addPost(postDTO);
		List<ArtworkDTO> artsDTO = postDTO.getArtList();
		List<Artworks> artworks = postService.convertArtList(artsDTO, savedPost);
		for (int i = 0; i < files.size(); i++) {
			MultipartFile file = files.get(i);
			Artworks artwork = artworks.get(i);
			Map<String, Object> data = cloudinaryService.upload(file);
			String url = data.get("url").toString();
			artwork.setImagePath(url);
			postService.addArtwork(artwork);
		}
		return ResponseEntity.ok("ok");
	}

	@GetMapping("getPostById")
	public ResponseEntity<ApiResponse> getPostById(@RequestParam("postId") String postId) {
		ApiResponse apiResponse = new ApiResponse();
		try{
			UUID convertedPostId = UUID.fromString(postId);
			PostDTO result = postService.getPostById(convertedPostId);
			if(result == null){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
			}
			apiResponse.ok(result);
			return ResponseEntity.ok(apiResponse);
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
		}
		
	}

	@GetMapping("getArtById")
	public ResponseEntity<ApiResponse> getArtById(@RequestParam("artId") String artId){
		ApiResponse apiResponse = new ApiResponse();
		try{
			UUID convertedArtId = UUID.fromString(artId);
			ArtworkDTO art = postService.getArtByArtId(convertedArtId);
			if(art == null){
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiResponse);
			}
			apiResponse.ok(art);
			return ResponseEntity.ok(apiResponse);
		}catch(Exception e){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiResponse);
		}
	}
	
	
	


}
