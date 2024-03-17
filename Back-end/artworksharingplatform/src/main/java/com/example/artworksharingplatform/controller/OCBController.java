package com.example.artworksharingplatform.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class OCBController {
	
    @GetMapping("/proxy/transactions/list")
    public ResponseEntity<String> proxyTransactionsList() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://my.sepay.vn/userapi/transactions/list";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return response;
    }
	
}
