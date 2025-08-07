package com.billingsoftware.billingsoftware.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    String uploadFile(MultipartFile file);

    boolean deleteFile(String imgUrl);
}
