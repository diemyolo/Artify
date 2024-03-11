package com.example.artworksharingplatform.service.impl;

import com.example.artworksharingplatform.entity.User;

import java.util.UUID;

public interface FollowingServiceImpl {
    public String Following(User audience, User creator) throws Exception;
}
