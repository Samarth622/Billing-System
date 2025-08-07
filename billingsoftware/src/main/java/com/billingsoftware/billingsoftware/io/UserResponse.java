package com.billingsoftware.billingsoftware.io;

import lombok.*;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponse {

    private String userId;

    private String name;

    private String email;

    private String role;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
