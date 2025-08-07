package com.billingsoftware.billingsoftware.io;

import lombok.*;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemResponse {

    private String itemId;
    private String name;
    private BigDecimal price;
    private String description;
    private String categoryId;
    private String categoryName;
    private String imgUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
