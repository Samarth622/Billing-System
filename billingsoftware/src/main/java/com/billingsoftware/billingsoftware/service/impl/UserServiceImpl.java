package com.billingsoftware.billingsoftware.service.impl;

import com.billingsoftware.billingsoftware.entity.UserEntity;
import com.billingsoftware.billingsoftware.io.UserRequest;
import com.billingsoftware.billingsoftware.io.UserResponse;
import com.billingsoftware.billingsoftware.repository.UserRepository;
import com.billingsoftware.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public String getUserRole(String email) {
        UserEntity existingUSer = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return existingUSer.getRole();
    }

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        UserEntity newUser = convertToEntity(userRequest);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return new UserResponse(
                newUser.getUserId(),
                newUser.getName(),
                newUser.getEmail(),
                newUser.getRole(),
                newUser.getCreatedAt(),
                newUser.getUpdatedAt()
        );
    }

    private UserEntity convertToEntity(UserRequest request) {
        UserEntity entity = new UserEntity();
        entity.setUserId(UUID.randomUUID().toString());
        entity.setPassword(passwordEncoder.encode(request.getPassword()));
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setRole(request.getRole().toUpperCase());
        return entity;
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUSer = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id));

        userRepository.delete(existingUSer);
    }
}
