package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.Path;

import java.util.List;
import java.util.Optional;

public interface PathRepository extends MongoRepository<Path, String> {
    // You can define custom query methods here if needed
    List<Path> findByUserid(String userid);
    Optional<Path> findById(String id);
    void deleteById(String id); // Method to delete a path by its object id
}
