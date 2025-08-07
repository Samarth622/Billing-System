package com.billingsoftware.billingsoftware.io;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserRequest {

    private String name;

    private String email;

    private String password;

    private String role;
}
