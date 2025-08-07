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
                        "cloud_name", "dizvwz61v",
                        "api_key", "478986572611589",
                        "api_secret", "NiPjbhuA7_PdqgJQL52DEV2JdBk"
                )
        );
        System.out.println(cloud);
        return cloud;
    }
}
