package com.billingsoftware.billingsoftware.io;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDetails {

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;

    private PaymentStatus status;

    public enum PaymentStatus {
        PENDING,
        COMPLETED,
        FAILED
    }
}
