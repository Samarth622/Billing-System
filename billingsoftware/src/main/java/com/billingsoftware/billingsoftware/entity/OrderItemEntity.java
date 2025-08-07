package com.billingsoftware.billingsoftware.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_order_items")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemId;

    private String name;

    private Double price;

    private Integer quantity;
}
