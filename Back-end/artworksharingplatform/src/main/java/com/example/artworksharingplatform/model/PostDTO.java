package com.example.artworksharingplatform.model;

import java.util.UUID;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.entity.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostDTO {
	private UUID postId;
	private String description;  
	private String creatorName;
	private String emailAddress;
	private User creator;


	// public PostDTO(Post post) {
	// 	this.postId = post.getId();
	// 	this.description = post.getDescription();
	// 	this.creator = post.getCreator();
	// }       

	
	private String description;
}
