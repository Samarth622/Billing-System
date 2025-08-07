package com.billingsoftware.billingsoftware.controller;

import com.billingsoftware.billingsoftware.io.OrderRequest;
import com.billingsoftware.billingsoftware.io.OrderResponse;
import com.billingsoftware.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request){
        return orderService.createOrder(request);
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId){
        orderService.deleteOrder(orderId);
    }

    @GetMapping("/latest")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getOrders(){
        return orderService.getLatestOrders();
    }
}
