package com.billingsoftware.billingsoftware.service.impl;

import com.billingsoftware.billingsoftware.service.CloudinaryService;
import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {
        String filenameExtention = Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key = UUID.randomUUID().toString()+"."+filenameExtention;
        try{
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of(
                            "public_id", key,         // Set custom name (optional)
                            "resource_type", "auto"   // Auto-detect type (image/video)
                    )
            );
            return uploadResult.get("secure_url").toString();
        } catch (Exception e) {
            throw new RuntimeException("Cloudinary upload failed: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        try {
            String publicId = extractPublicId(imgUrl);

            Map result = cloudinary.uploader().destroy(publicId, Map.of("resource_type", "image"));

            return "ok".equals(result.get("result"));
        } catch (Exception e) {
            throw new RuntimeException("Cloudinary deletion failed: " + e.getMessage(), e);
        }
    }

    private String extractPublicId(String imgUrl) {
        try {
            String withoutVersion = imgUrl.substring(imgUrl.indexOf("/upload/") + 8);
            withoutVersion = withoutVersion.substring(withoutVersion.indexOf('/') + 1);
            return withoutVersion.substring(0, withoutVersion.lastIndexOf('.'));
        } catch (Exception e) {
            throw new RuntimeException("Invalid Cloudinary URL: " + imgUrl);
        }
    }
}
