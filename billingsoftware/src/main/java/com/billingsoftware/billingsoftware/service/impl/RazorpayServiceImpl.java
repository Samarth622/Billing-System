package com.billingsoftware.billingsoftware.service.impl;

import com.billingsoftware.billingsoftware.io.OrderResponse;
import com.billingsoftware.billingsoftware.io.RazorpayOrderResponse;
import com.billingsoftware.billingsoftware.service.RazorpayService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount*100);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "order_recptid_"+System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = razorpayClient.orders.create(orderRequest);

        return convertToRazorpayResponse(order);
    }

    private RazorpayOrderResponse convertToRazorpayResponse(Order order) {
        return RazorpayOrderResponse.builder()
                .Id(order.get("id"))
                .amount(order.get("amount"))
                .entity(order.get("entity"))
                .currency(order.get("currency"))
                .receipt(order.get("receipt"))
                .status(order.get("status"))
                .created_at(order.get("created_at"))
                .build();
    }
}
