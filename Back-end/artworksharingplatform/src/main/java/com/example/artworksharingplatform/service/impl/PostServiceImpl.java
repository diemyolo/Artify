package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;

public interface PostServiceImpl {
	public List<Post> getAllPosts();

	public void addArtwork(Artworks artwork);
	public void deleteArtwork(UUID id) throws Exception;
}
