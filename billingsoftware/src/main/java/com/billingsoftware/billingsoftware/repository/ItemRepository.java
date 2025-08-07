package com.billingsoftware.billingsoftware.repository;

import com.billingsoftware.billingsoftware.entity.CategoryEntity;
import com.billingsoftware.billingsoftware.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategory(CategoryEntity category);
}
