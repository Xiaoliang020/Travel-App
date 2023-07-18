package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByUsername(String username);
}