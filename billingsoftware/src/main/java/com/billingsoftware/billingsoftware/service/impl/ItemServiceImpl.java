package com.billingsoftware.billingsoftware.service.impl;

import com.billingsoftware.billingsoftware.entity.CategoryEntity;
import com.billingsoftware.billingsoftware.entity.ItemEntity;
import com.billingsoftware.billingsoftware.io.ItemRequest;
import com.billingsoftware.billingsoftware.io.ItemResponse;
import com.billingsoftware.billingsoftware.repository.CategoryRepository;
import com.billingsoftware.billingsoftware.repository.ItemRepository;
import com.billingsoftware.billingsoftware.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final CategoryRepository categoryRepository;

    private final CloudinaryServiceImpl cloudinaryServiceImpl;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        String imgUrl = cloudinaryServiceImpl.uploadFile(file);
        ItemEntity entity = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        entity.setCategory(existingCategory);
        entity.setImgUrl(imgUrl);
        entity = itemRepository.save(entity);
        return convertToResponse(entity);
    }

    private ItemResponse convertToResponse(ItemEntity entity) {
        return new ItemResponse(
                entity.getItemId(),
                entity.getName(),
                entity.getPrice(),
                entity.getDescription(),
                entity.getCategory().getCategoryId(),
                entity.getCategory().getName(),
                entity.getImgUrl(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        ItemEntity item = new ItemEntity();
        item.setItemId(UUID.randomUUID().toString());
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());
        return item;
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String id) {
        ItemEntity existingItem = itemRepository.findByItemId(id)
                .orElseThrow(() -> new RuntimeException("Item not find with the id : " + id));
        boolean isFileDelete = cloudinaryServiceImpl.deleteFile(existingItem.getImgUrl());
        if(isFileDelete){
            itemRepository.delete(existingItem);
        } else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "unable to delete file");
        }
    }
}
