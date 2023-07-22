package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.Path;

import java.util.List;

public interface PathRepository extends MongoRepository<Path, String> {
    // You can define custom query methods here if needed
    List<Path> findByUserid(String userid);
}
