package com.example.artworksharingplatform.entity;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @UuidGenerator
    private UUID id;

    @Column(name = "UserName", length = 50, nullable = false)
    private String userName;

    @Column(name = "EmailAddress", unique = true, nullable = false)
    private String emailAddress;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "Telephone", length = 10, nullable = true)
    private String telephone;

    @Column(name = "ImagePath", columnDefinition = "nvarchar(max)")
    private String imagePath;

    @Column(name = "Status", nullable = false)
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CreatedDate")
    private Timestamp createdDate;

    @OneToMany(mappedBy = "userInputs", cascade = CascadeType.ALL)
    private List<MoneyInput> inputs;

    @OneToOne(mappedBy = "user")
    private EWallet eWallet;

    @OneToMany(mappedBy = "audience", cascade = CascadeType.ALL)
    private List<Order> orders;

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    private List<Post> posts;

    @OneToMany(mappedBy = "preOrderCreator", cascade = CascadeType.ALL)
    private List<PreOrder> preOrderCreators;

    @OneToMany(mappedBy = "preOrderAudience", cascade = CascadeType.ALL)
    private List<PreOrder> preOrderAudiences;

    @OneToMany(mappedBy = "interactionAudience", cascade = CascadeType.ALL)
    private List<Interaction> interactions;

    @ManyToMany
    @JoinTable(name = "following", joinColumns = @JoinColumn(name = "audience_id"), inverseJoinColumns = @JoinColumn(name = "creator_id"))
    private List<User> audience;
    @ManyToMany(mappedBy = "audience")
    private List<User> creator;

    @OneToMany(mappedBy = "user")
    private List<Transaction> transactions;

    @ManyToOne
    @JoinColumn(name = "RoleID")
    private Role role;
}
