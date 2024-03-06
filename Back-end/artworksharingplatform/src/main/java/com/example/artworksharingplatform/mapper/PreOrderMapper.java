package com.example.artworksharingplatform.mapper;

import com.example.artworksharingplatform.entity.PreOrder;
import com.example.artworksharingplatform.model.PreOrderDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PreOrderMapper {

    @Mapping(source = "preOrder.preOrderCreator.id", target = "creatorId")
    @Mapping(source = "preOrder.requirement", target = "requirement")

    PreOrderDTO toPreOrder(PreOrder preOrder);
    List<PreOrderDTO> toList(List<PreOrder> preOrderList);
}
