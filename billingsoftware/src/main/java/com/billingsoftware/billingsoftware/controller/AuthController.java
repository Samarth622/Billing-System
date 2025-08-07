package com.billingsoftware.billingsoftware.controller;

import com.billingsoftware.billingsoftware.io.AuthRequest;
import com.billingsoftware.billingsoftware.io.AuthResponse;
import com.billingsoftware.billingsoftware.service.UserService;
import com.billingsoftware.billingsoftware.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
        authenticate(request.getEmail(), request.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken = jwtUtil.generateToken(userDetails);
        final String role = userService.getUserRole(request.getEmail());
        return new AuthResponse(request.getEmail(), jwtToken, role);
    }

    private void authenticate(String email, String password) throws Exception {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch(DisabledException e){
            throw new DisabledException("User Disabled");
        } catch (BadCredentialsException e){
            throw new BadCredentialsException("Email or Password are incorrect");
        } catch (Exception e){
            throw new Exception("Something went wrong while authenticate");
        }
    }

    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request){
        return passwordEncoder.encode(request.get("password"));
    }
}
