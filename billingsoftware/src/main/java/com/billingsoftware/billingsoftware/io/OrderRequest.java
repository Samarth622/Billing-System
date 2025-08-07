package com.billingsoftware.billingsoftware.io;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {

    private String customerName;

    private String customerMobile;

    private List<OrderItemRequest> cartItems;

    private Double subTotal;

    private Double tax;

    private Double grandTotal;

    private String paymentMethod;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemRequest {

        private String itemId;

        private String name;

        private Double price;

        private Integer quantity;
    }
}
