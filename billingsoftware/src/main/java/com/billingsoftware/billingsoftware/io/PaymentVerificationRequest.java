package com.billingsoftware.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentVerificationRequest {

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

    private String orderId;
}
