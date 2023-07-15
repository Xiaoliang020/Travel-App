package com.travelapp.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String apiRoot() {
        return "Hello, Traveler!";
    }

    @RequestMapping("/hello")
    public String hello(){
        return "Hello, Frontend!";
    }

    @PostMapping("/print")
    public void printMessage(@RequestBody Map<String, String> requestBody) {
        String message = requestBody.get("message");
        System.out.println("Received message from frontend: " + message);
    }
}
