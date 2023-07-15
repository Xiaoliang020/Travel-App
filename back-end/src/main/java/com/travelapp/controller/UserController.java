package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired; // For @Autowired annotation
import org.springframework.http.ResponseEntity; // For ResponseEntity class
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // For @PostMapping annotation
import org.springframework.web.bind.annotation.RequestMapping; // For @RequestMapping annotation
import org.springframework.web.bind.annotation.RestController; // For @RestController annotation

import com.travelapp.model.User; // Replace with the actual package for your User entity
import com.travelapp.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/users")
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
}
