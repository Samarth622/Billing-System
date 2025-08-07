package com.billingsoftware.billingsoftware.io;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private Double todaySales;

    private Long todayOrderCount;

    private List<OrderResponse> recentOrders;
}
