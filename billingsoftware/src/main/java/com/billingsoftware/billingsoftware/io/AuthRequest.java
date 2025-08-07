package com.billingsoftware.billingsoftware.io;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthRequest {

    private String email;

    private String password;
}
