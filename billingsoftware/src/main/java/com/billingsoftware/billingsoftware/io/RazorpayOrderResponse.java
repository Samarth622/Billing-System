package com.billingsoftware.billingsoftware.io;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RazorpayOrderResponse {

    private String Id;

    private String entity;

    private Integer amount;

    private String currency;

    private String status;

    private Date created_at;

    private String receipt;
}
