package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired; // For @Autowired annotation
import org.springframework.http.ResponseEntity; // For ResponseEntity class
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // For @PostMapping annotation
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping; // For @RequestMapping annotation
import org.springframework.web.bind.annotation.RestController; // For @RestController annotation

import com.travelapp.common.Result;
import com.travelapp.model.User;
import com.travelapp.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @PostMapping("/register")
    public Result<?> register(@RequestBody User user) {
        // Check if the user already exists in the database based on the email (assuming email is unique)
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return Result.error("-1", "User already exists");
        }

        // Save the user in the database
        userRepository.save(user);
        return Result.success();
    }
}
