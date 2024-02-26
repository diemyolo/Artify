package com.example.artworksharingplatform.service.impl;

import java.util.List;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.model.ArtworkDTO;
import com.example.artworksharingplatform.model.PostDTO;

public interface PostServiceImpl {
	public List<Post> getAllPosts();

	public Post convertToPost(PostDTO postDTO);

	public Artworks convertToArtworks(ArtworkDTO artworks);

	public void addArtwork(Artworks artwork);
}
