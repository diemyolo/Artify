package com.example.artworksharingplatform.model;

import java.util.UUID;

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
}
