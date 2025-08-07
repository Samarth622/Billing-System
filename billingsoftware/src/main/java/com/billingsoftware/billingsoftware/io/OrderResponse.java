package com.billingsoftware.billingsoftware.io;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private String orderId;

    private String customerName;

    private String customerMobile;

    private List<OrderItemResponse> items;

    private Double subTotal;

    private Double tax;

    private Double grandTotal;

    private PaymentMethod paymentMethod;

    private PaymentDetails paymentDetails;

    private LocalDateTime createdAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemResponse {

        private String itemId;

        private String name;

        private Double price;

        private Integer quantity;
    }
}
