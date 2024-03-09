package com.example.artworksharingplatform.model;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PreOrderDTO {
    private UUID preOrderId;
    private String status;
    private float price;
    private String requirement;
    private int audienceRating;
    private String audienceFeedback;
    private String creatorNote;
    private Timestamp preOrderDate;
    private UUID creatorId;
    private UUID audienceId;
    private UUID artworkId;
}
