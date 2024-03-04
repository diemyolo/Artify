package com.example.artworksharingplatform.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.model.PreOrderDTO;

@Mapper(componentModel = "spring")
public interface PreOrderMapper {
	@Mapping(source = "preOrder.id" ,target ="creatorId")

	PreOrderDTO toPreOrderDTO(PreOrder preOrder);
}
