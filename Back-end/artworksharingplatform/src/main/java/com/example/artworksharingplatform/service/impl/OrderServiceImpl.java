package com.example.artworksharingplatform.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.artworksharingplatform.entity.Artworks;
import com.example.artworksharingplatform.entity.EWallet;
import com.example.artworksharingplatform.entity.Order;
import com.example.artworksharingplatform.entity.Transaction;
import com.example.artworksharingplatform.entity.User;
import com.example.artworksharingplatform.repository.ArtworkRepository;
import com.example.artworksharingplatform.repository.EWalletRepository;
import com.example.artworksharingplatform.repository.OrderRepository;
import com.example.artworksharingplatform.repository.TransactionRepository;
import com.example.artworksharingplatform.repository.UserRepository;
import com.example.artworksharingplatform.service.OrderService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    EWalletRepository eWalletRepository;

    @Autowired
    OrderRepository orderRepository;

    @Transactional
    @SuppressWarnings("null")
    @Override
    public Order addOrder(Order order) throws Exception {
        try {
            Artworks artwork = artworkRepository.findById(order.getArtwork().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Artwork not found"));

            if (artwork.getType().toLowerCase().equals("premium")
                    && artwork.getStatus().toLowerCase().equals("active")) {
                User user = userRepository.findById(order.getAudience().getId())
                        .orElseThrow(() -> new EntityNotFoundException("User not found"));

                EWallet eWallet = eWalletRepository.findByUser_Id(user.getId());
                float totalMoney = order.getTotalPrice();

                Transaction transaction = new Transaction();
                transaction.setTotalMoney(totalMoney);
                transaction.setUser(user);
                transaction.setOrder(order);
                transactionRepository.save(transaction);

                float newBalance = eWallet.getTotalAmount() - totalMoney;
                eWallet.setTotalAmount(newBalance);
                eWalletRepository.save(eWallet);

                order.setTransactions(transaction);
                return orderRepository.save(order);
            } else {
                throw new Exception();
            }

        } catch (Exception e) {
            throw new Exception("Download image fail", e);
        }

    }

    @Override
    public long countOrders() {
        return orderRepository.count();
    }

}
