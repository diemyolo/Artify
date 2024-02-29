package com.example.artworksharingplatform.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.repository.ArtworkRepository;
import com.example.artworksharingplatform.repository.PostRepository;
import com.example.artworksharingplatform.service.impl.PostServiceImpl;

@Service
public class PostService implements PostServiceImpl {


    @Autowired
    PostRepository postRepository;

    @Autowired
    ArtworkRepository artworkRepository;

    @Override
    public List<Post> getAllPosts() {
        // TODO Auto-generated method stub
        List<Post> postList = postRepository.findAll();
        return postList;
    }

    @Override
    public void addArtwork(Artworks artwork) {
        artworkRepository.save(artwork);
    }

    @Override
    public void deleteArtwork(UUID id) throws Exception {
        try {
            postRepository.deleteById(id);

        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


}
