package com.billingsoftware.billingsoftware.service;

import com.billingsoftware.billingsoftware.io.UserRequest;
import com.billingsoftware.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
