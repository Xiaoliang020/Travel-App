package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.Post;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {
    // You can define custom query methods here if needed
    
}