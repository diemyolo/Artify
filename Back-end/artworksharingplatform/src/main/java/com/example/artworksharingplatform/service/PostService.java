package com.example.artworksharingplatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.model.ArtworkDTO;
import com.example.artworksharingplatform.model.PostDTO;
import com.example.artworksharingplatform.repository.ArtworkRepository;
import com.example.artworksharingplatform.repository.PostRepository;
import com.example.artworksharingplatform.service.impl.PostServiceImpl;

@Service
public class PostService implements PostServiceImpl {

	@Autowired
	PostRepository postRepository;

	@Autowired
	ArtworkRepository artworkRepository;

	@Override
	public List<Post> getAllPosts() {
		// TODO Auto-generated method stub
		List<Post> postList = postRepository.findAll();
		return postList;
	}

	@Override
	public Post convertToPost(PostDTO postDTO) {
		Post post = new Post();
		post.setId(postDTO.getPostId());
		post.setDescription(postDTO.getDescription());
		post.setNumberOfLikes(postDTO.getNumberOfLikes());
		return post;
	}

	@Override
	public Artworks convertToArtworks(ArtworkDTO artworks) {
		// TODO Auto-generated method stub
		throw new UnsupportedOperationException("Unimplemented method 'convertToArtworks'");
	}

	@Override
	public void addArtwork(Artworks artwork) {
		// TODO Auto-generated method stub
		artworkRepository.save(artwork);
	}

	
}
