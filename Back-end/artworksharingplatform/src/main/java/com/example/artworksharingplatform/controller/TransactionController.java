package com.example.artworksharingplatform.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.artworksharingplatform.entity.Transaction;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.mapper.TransactionMapper;
import com.example.artworksharingplatform.model.ApiResponse;
import com.example.artworksharingplatform.model.TransactionDTO;
import com.example.artworksharingplatform.service.TransactionService;
import com.example.artworksharingplatform.service.UserService;

@RestController
@RequestMapping("api/auth/transaction")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @Autowired
    TransactionMapper transactionMapper;

    @Autowired
    UserService userService;

    @GetMapping("/viewList")
    public ResponseEntity<ApiResponse<List<TransactionDTO>>> viewTransactionsList() {
        ApiResponse<List<TransactionDTO>> apiResponse = new ApiResponse<List<TransactionDTO>>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        User user = userService.findByEmail(email);

        try {
            List<Transaction> transactions = transactionService.getTransactionsByUserId(user.getId());
            List<TransactionDTO> transactionDTOs = transactionMapper.toList(transactions);

            apiResponse.ok(transactionDTOs);
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            apiResponse.error(e);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }

}
