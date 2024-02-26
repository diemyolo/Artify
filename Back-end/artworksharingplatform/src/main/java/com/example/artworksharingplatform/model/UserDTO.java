package com.example.artworksharingplatform.model;

import lombok.Data;

@Data
public class UserDTO {
    private String userName;
    private String emailAddress;
    private String telephone;
    private String imagePath;
    private String password;
}