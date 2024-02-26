package com.example.artworksharingplatform.service.impl;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryServiceImpl {
	public Map upload(MultipartFile file);
}
