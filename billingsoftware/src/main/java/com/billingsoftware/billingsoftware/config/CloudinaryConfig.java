package com.billingsoftware.billingsoftware.config;

import com.cloudinary.Cloudinary;
//import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Cloudinary cloud = new Cloudinary(
                Map.of(
                        "cloud_name", "CLOUD_NAME",
                        "api_key", "API_KEY",
                        "api_secret", "API_SECRET"
                )
        );
        System.out.println(cloud);
        return cloud;
    }
}
