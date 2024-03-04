package com.example.artworksharingplatform.model;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PreOrderDTO {
	
    private UUID creatorId;
    private String requirement;
    private String status;
    private UUID audienceId;
}
