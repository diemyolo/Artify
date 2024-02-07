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
@Table(name="Roles")
public class Role {

	@Id
    @UuidGenerator
    private UUID id;

	@Column(name="RoleName")
	private String roleName;

	@OneToMany(mappedBy="role", cascade = CascadeType.ALL)
	private List<User> roleUsers;
}
