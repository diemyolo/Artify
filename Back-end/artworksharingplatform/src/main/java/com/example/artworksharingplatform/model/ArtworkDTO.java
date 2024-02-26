package com.example.artworksharingplatform.model;

import java.util.Date;
import java.util.UUID;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ArtworkDTO {
	private UUID artId;
	private String artName;
	private Date createdDate;
	private String imagePath;
	private String status;
	private float price;
	private String type;
	private UUID postId;
}
