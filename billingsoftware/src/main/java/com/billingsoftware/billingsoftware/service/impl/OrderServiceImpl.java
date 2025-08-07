package com.billingsoftware.billingsoftware.service.impl;

import com.billingsoftware.billingsoftware.entity.OrderEntity;
import com.billingsoftware.billingsoftware.entity.OrderItemEntity;
import com.billingsoftware.billingsoftware.io.*;
import com.billingsoftware.billingsoftware.repository.OrderEntityRepository;
import com.billingsoftware.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderEntityRepository orderEntityRepository;

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity order = orderEntityRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        orderEntityRepository.delete(order);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderEntityRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(
                newOrder.getPaymentMethod() == PaymentMethod.CASH
                        ? PaymentDetails.PaymentStatus.COMPLETED
                        : PaymentDetails.PaymentStatus.PENDING);

        newOrder.setPaymentDetails(paymentDetails);
        List<OrderItemEntity> orderItems = request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);
        newOrder = orderEntityRepository.save(newOrder);

        return convertToOrderResponse(newOrder);
    }

    private OrderResponse convertToOrderResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .customerMobile(newOrder.getCustomerMobile())
                .items(newOrder.getItems().stream().map(this::convertToItemResponse).collect(Collectors.toList()))
                .subTotal(newOrder.getSubTotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .paymentDetails(newOrder.getPaymentDetails())
                .createdAt(newOrder.getCreatedAt())
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return new OrderResponse.OrderItemResponse(
                orderItemEntity.getItemId(),
                orderItemEntity.getName(),
                orderItemEntity.getPrice(),
                orderItemEntity.getQuantity()
        );
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        OrderItemEntity entity = new OrderItemEntity();
        entity.setItemId(orderItemRequest.getItemId());
        entity.setName(orderItemRequest.getName());
        entity.setPrice(orderItemRequest.getPrice());
        entity.setQuantity(orderItemRequest.getQuantity());

        return entity;
    }


    private OrderEntity convertToOrderEntity(OrderRequest request) {
        OrderEntity entity = new OrderEntity();
        entity.setCustomerName(request.getCustomerName());
        entity.setCustomerMobile(request.getCustomerMobile());
        entity.setSubTotal(request.getSubTotal());
        entity.setTax(request.getTax());
        entity.setGrandTotal(request.getGrandTotal());
        entity.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()));
        return entity;
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if(!verifyRazorpaySignature(request.getRazorpayOrderId()
        , request.getRazorpayPaymentId()
        , request.getRazorpaySignature())){
            throw new RuntimeException("Payment verification failed");
        }

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
        paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);

        existingOrder = orderEntityRepository.save(existingOrder);
        return convertToOrderResponse(existingOrder);
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderEntityRepository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderEntityRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders() {
        return orderEntityRepository.findRecentOrders(PageRequest.of(0, 5)).stream()
                .map(this::convertToOrderResponse)
                .collect((Collectors.toList()));
    }

    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        // for production make this proper with secret key
        return true;
    }
}
