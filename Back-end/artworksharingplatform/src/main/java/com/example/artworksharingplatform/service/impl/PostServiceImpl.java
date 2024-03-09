package com.example.artworksharingplatform.service.impl;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.model.ArtworkDTO;
import com.example.artworksharingplatform.model.PostDTO;

public interface PostServiceImpl {
	public List<Post> getAllPosts();

	public void addArtwork(Artworks artwork);
	public void deleteArtwork(UUID id) throws Exception;
	public Post addPost(PostDTO post);
	public List<Artworks> convertArtList(List<ArtworkDTO> artsDTO,Post post);
	public PostDTO getPostById(UUID id);

	public ArtworkDTO getArtByArtId(UUID artId);
}
