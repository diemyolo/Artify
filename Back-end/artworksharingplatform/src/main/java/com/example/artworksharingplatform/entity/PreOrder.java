package com.example.artworksharingplatform.entity;

import java.util.UUID;

import lombok.Data;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="PreOrders")
@Data
public class PreOrder {
	@Id
    @UuidGenerator
    private UUID id;

	@Column(name="Status")
	private String status;
	
	@Column(name="Price")
	private float price;

	@Column(name="Requirement")
	private String requirement;

	@Column(name="AudienceRating")
	private int audienceRating;

	@Column(name="AudienceFeedback")
	private String audienceFeedback;

	@Column(name="CreatorNote")
	private String creatorNote;

	@ManyToOne
	@JoinColumn(name="AudienceID")
	private User preOrderAudience;
	
	@ManyToOne
	@JoinColumn(name="CreatorID")
	private User preOrderCreator;

	@OneToOne(mappedBy = "preOrder")
    private Transaction transactions;
}
