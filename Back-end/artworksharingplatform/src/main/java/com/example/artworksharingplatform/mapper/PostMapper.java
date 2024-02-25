package com.example.artworksharingplatform.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.model.PostDTO;

@Mapper(componentModel = "spring")
public interface PostMapper {

	@Mapping(source = "post.id" , target = "postId")
	@Mapping(source = "post.description", target = "description")
	@Mapping(source = "creator.name", target = "creatorName")
	@Mapping(source = "creator.emailAddress", target = "emailAddress")
	@Mapping(source = "postsInteraction" ,target = "interactions")
	@Mapping(source = "artworks" , target = "artList")

	PostDTO toPostDTO(Post post);
	List<PostDTO> toList(List<Post> postList);
} 
