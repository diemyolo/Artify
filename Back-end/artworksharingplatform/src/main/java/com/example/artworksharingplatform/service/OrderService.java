package com.example.artworksharingplatform.service;

import com.example.artworksharingplatform.entity.Order;

public interface OrderService {
    Order addOrder(Order order) throws Exception;

    long countOrders();
}
