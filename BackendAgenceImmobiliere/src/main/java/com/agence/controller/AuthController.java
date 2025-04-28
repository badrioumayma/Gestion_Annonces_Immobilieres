package com.agence.controller;

import com.agence.entity.User;
import com.agence.service.AuthService;
import com.agence.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> body) {
        String usernameOrEmail = body.get("username") != null ? body.get("username") : body.get("email");
        String password = body.get("password");
        Optional<User> userOpt = authService.authenticate(usernameOrEmail, password);
        if (userOpt.isPresent()) {
            String token = jwtUtils.generateToken(userOpt.get().getUsername());
            Map<String, Object> response = new HashMap<>();
            response.put("user", userOpt.get());
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
        }
    }
} 