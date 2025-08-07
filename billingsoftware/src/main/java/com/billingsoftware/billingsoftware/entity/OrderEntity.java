package com.billingsoftware.billingsoftware.entity;

import com.billingsoftware.billingsoftware.io.PaymentDetails;
import com.billingsoftware.billingsoftware.io.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_orders")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId;

    private String customerName;

    private String customerMobile;

    private Double subTotal;

    private Double tax;

    private Double grandTotal;

    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItemEntity> items = new ArrayList<>();

    @Embedded
    private PaymentDetails paymentDetails;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @PrePersist
    protected void onCreate(){
        this.orderId = "ORD" + System.currentTimeMillis();
        this.createdAt = LocalDateTime.now();
    }
}
