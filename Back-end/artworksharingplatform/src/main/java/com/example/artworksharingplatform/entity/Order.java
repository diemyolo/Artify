package com.example.artworksharingplatform.entity;


import java.sql.Timestamp;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name="Orders")
public class Order {
	
	@Id
    @UuidGenerator
    private UUID id;

	@Column(name="TotalPrice")
	private float totalPrice;

    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="OrderDate")
	private Timestamp orderDate;

	@ManyToOne
	@JoinColumn(name="Audience")
	private User audience;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="ArtworkId", referencedColumnName="id")
	private Artworks artwork;

	@OneToOne(mappedBy = "order")
    private Transaction transactions;

}
