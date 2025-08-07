package com.billingsoftware.billingsoftware.controller;

import com.billingsoftware.billingsoftware.io.ItemRequest;
import com.billingsoftware.billingsoftware.io.ItemResponse;
import com.billingsoftware.billingsoftware.service.ItemService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("item")String itemString,
                                @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest itemRequest = null;
        ItemResponse itemResponse = null;
        try{
            itemRequest = objectMapper.readValue(itemString, ItemRequest.class);
            itemResponse = itemService.add(itemRequest, file);
        } catch (JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurring while processing json");
        }

        return itemResponse;
    }

    @GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public List<ItemResponse> readItems(){
        return itemService.fetchItems();
    }

    @DeleteMapping("/admin/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable String itemId){
        try{
            itemService.deleteItem(itemId);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found : " + itemId);
        }
    }
}
