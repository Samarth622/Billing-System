package com.billingsoftware.billingsoftware.io;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CategoryRequest {

    private String name;

    private String description;

    private String bgColor;
}
