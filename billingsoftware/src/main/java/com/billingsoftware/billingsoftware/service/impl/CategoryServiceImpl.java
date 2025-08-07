package com.billingsoftware.billingsoftware.service.impl;

import com.billingsoftware.billingsoftware.entity.CategoryEntity;
import com.billingsoftware.billingsoftware.io.CategoryRequest;
import com.billingsoftware.billingsoftware.io.CategoryResponse;
import com.billingsoftware.billingsoftware.repository.CategoryRepository;
import com.billingsoftware.billingsoftware.repository.ItemRepository;
import com.billingsoftware.billingsoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final CloudinaryServiceImpl cloudinaryServiceImpl;

    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        String imgUrl = cloudinaryServiceImpl.uploadFile(file);
        System.out.println(imgUrl);
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
         return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));

        cloudinaryServiceImpl.deleteFile(existingCategory.getImgUrl());

        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {

        Integer itemsCount = itemRepository.countByCategory(newCategory);

        return new CategoryResponse(
                newCategory.getCategoryId(),
                newCategory.getName(),
                newCategory.getDescription(),
                newCategory.getBgColor(),
                newCategory.getImgUrl(),
                newCategory.getCreatedAt(),
                newCategory.getUpdatedAt(),
                itemsCount
        );
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {

        CategoryEntity entity = new CategoryEntity();
        entity.setCategoryId(UUID.randomUUID().toString());
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        entity.setBgColor(request.getBgColor());
        return entity;
    }
}
