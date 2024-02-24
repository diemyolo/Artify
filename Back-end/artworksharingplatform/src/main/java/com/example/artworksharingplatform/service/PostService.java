package com.example.artworksharingplatform.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.artworksharingplatform.entity.Post;
import com.example.artworksharingplatform.repository.PostRepository;
import com.example.artworksharingplatform.service.impl.PostServiceImpl;

@Service
public class PostService implements PostServiceImpl {

	@Autowired
	PostRepository postRepository;

	@Override
	public List<Post> getAllPosts() {
		// TODO Auto-generated method stub
		List<Post> postList = postRepository.findAll();
		return postList;
	}

}
