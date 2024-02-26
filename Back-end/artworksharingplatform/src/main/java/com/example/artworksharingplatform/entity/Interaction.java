package com.example.artworksharingplatform.entity;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Interactions")
public class Interaction {

	@Id
	@UuidGenerator
	private UUID id;

	@Column(name = "Comments", length = 255)
	private String comment;

	@Column(name = "IsLiked")
	private Boolean isLiked;

	@ManyToOne
	@JoinColumn(name = "AudienceID")
	private User interactionAudience;

	@ManyToOne
	@JoinColumn(name = "PostID")
	private Post interactionPost;
}
