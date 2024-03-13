package com.example.artworksharingplatform.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.artworksharingplatform.entity.Transaction;
import com.example.artworksharingplatform.model.TransactionDTO;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(source = "transaction.user.id", target = "userId")
    @Mapping(source = "transaction.totalMoney", target = "totalMoney")
    @Mapping(source = "transaction.transactionDate", target = "transactionDate")
    @Mapping(ignore = true, target = "description")
    @Mapping(ignore = true, target = "inputMoney")
    @Mapping(ignore = true, target = "transactionId")
    TransactionDTO orderToTransactionDTO(Transaction transaction);

    @Mapping(source = "transaction.id", target = "transactionId")
    @Mapping(source = "transaction.totalMoney", target = "totalMoney")
    @Mapping(source = "transaction.transactionDate", target = "transactionDate")
    @Mapping(ignore = true, target = "inputMoney")
    @Mapping(ignore = true, target = "description")
    @Mapping(ignore = true, target = "userId")
    TransactionDTO toTransactionDTO(Transaction transaction);

    // List<TransactionDTO> toList(List<Transaction> transactions);

}