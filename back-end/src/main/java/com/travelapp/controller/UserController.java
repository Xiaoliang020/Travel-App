package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired; // For @Autowired annotation
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // For @PostMapping annotation
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping; // For @RequestMapping annotation
import org.springframework.web.bind.annotation.RestController; // For @RestController annotation
import java.io.IOException;
import java.io.FileNotFoundException;

import java.util.Optional;
import com.travelapp.common.Result;
import com.travelapp.model.User;
import com.travelapp.repository.UserRepository;
import com.travelapp.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @PostMapping("/register")
    public Result<?> register(@RequestBody User user) {
        // Check if the user already exists in the database based on the email and username
        User existingEmail = userRepository.findByEmail(user.getEmail());
        User existingUsername = userRepository.findByUsername(user.getUsername());

        if (existingEmail != null) {
            return Result.error("-1", "The email already exists");
        }

        if (existingUsername != null) {
            return Result.error("-1", "The username already exists");
        }

        // Save the user in the database
        userRepository.save(user);
        return Result.success();
    }

    @PostMapping("/login")
    public Result<?> login(@RequestBody User user) {
        // Find the user in the database based on the username
        User existingUser = userRepository.findByUsername(user.getUsername());

        // Check if user exists
        if (existingUser == null) {
            return Result.error("-1", "Invalid username or password");
        }

        // Check if the provided password matches the password
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return Result.error("-1", "Invalid username or password");
        }
        return Result.success(existingUser);
    }

    @PostMapping("/{userId}/upload-avatar")
    public Result<?> uploadAvatar(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        try {
            String avatarUrl = userService.saveAvatar(userId, file);
            return Result.success(avatarUrl);
        } catch (IOException e) {
            return Result.error("-1", "Failed to upload the avatar");
        }
    }

    @GetMapping("/avatar/{userid}")
    public Result<?> getAvatarByUserId(@PathVariable String userid) {
        Optional<User> user = userService.findUser(userid);
        if (user.isPresent()) {
            String avatarUrl = user.get().getAvatarUrl();
            try {
                byte[] avatarData = userService.getAvatarDataByUrl(avatarUrl);
                return Result.success(avatarData);
            } catch (FileNotFoundException e) {
                return Result.error("-1", "Avatar File not found");
            } catch (IOException e) {
                return Result.error("-1", "Output stream error");
            }
        } else {
            return Result.error("-1", "User not found");
        }
    }
}
