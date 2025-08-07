package com.billingsoftware.billingsoftware.io;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CategoryResponse {

    private String categoryId;

    private String name;

    private String description;

    private String bgColor;

    private String imgUrl;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private Integer items;
}
