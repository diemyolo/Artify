package com.example.artworksharingplatform.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.model.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "user.emailAddress", target = "emailAddress")
    @Mapping(source = "user.telephone", target = "telephone")
    @Mapping(source = "user.imagePath", target = "imagePath")
    @Mapping(source = "user.pass", target = "password")
    UserDTO toUserDTO(User user);
}
