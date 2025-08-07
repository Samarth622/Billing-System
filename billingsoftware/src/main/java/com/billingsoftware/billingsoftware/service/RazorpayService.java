package com.billingsoftware.billingsoftware.service;

import com.billingsoftware.billingsoftware.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
