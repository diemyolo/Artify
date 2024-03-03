package com.example.artworksharingplatform.entity;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class EWallet {
	
	@Id
	@UuidGenerator
    private UUID id;

	@Column(name = "TotalAmount")
	private float totalAmount;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "UserID" , referencedColumnName = "id")
	private User user;


}
