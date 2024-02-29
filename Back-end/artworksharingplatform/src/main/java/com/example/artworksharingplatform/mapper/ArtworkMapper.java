package com.example.artworksharingplatform.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.model.ArtworkDTO;

@Mapper(componentModel = "spring")
public interface ArtworkMapper {
    
    @Mapping(source = "artwork.id" , target = "artId")
    @Mapping(source = "artwork.artName" , target = "artName")
    @Mapping(source = "posts.id" , target = "postId")
    ArtworkDTO tArtworkDTO(Artworks artwork);
    List<ArtworkDTO> toArtworkDTOs(List<Artworks> artworks);
}
