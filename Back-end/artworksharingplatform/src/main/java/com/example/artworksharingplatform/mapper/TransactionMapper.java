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
    TransactionDTO orderToTransactionDTO(Transaction transaction);

    List<TransactionDTO> toTransactionDTOsList(List<Transaction> transactionsList);
}
