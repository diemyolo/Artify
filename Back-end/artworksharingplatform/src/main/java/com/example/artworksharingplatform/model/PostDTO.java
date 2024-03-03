package com.example.artworksharingplatform.model;

import java.util.List;
import java.util.UUID;

import com.example.artworksharingplatform.entity.Interaction;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PostDTO {
	private UUID postId;
	private String description;
	private String creatorName;
	private String emailAddress;
	private List<ArtworkDTO> artList;
	private List<Interaction> interactions;
}
