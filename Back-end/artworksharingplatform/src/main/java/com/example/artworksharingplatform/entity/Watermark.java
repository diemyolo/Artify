package com.example.artworksharingplatform.entity;

import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Watermark")
public class Watermark {
	
	@Id
    @UuidGenerator
    private UUID id;

	@Column(name="WatermarkImagePath", columnDefinition = "nvarchar(max)")
	private String watermarkImagePath;

	@OneToMany(mappedBy="watermark", cascade = CascadeType.ALL)
	private List<Artworks> artworks;

}
