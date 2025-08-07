package com.billingsoftware.billingsoftware.service;

import com.billingsoftware.billingsoftware.io.ItemRequest;
import com.billingsoftware.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String id);
}
