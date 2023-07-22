package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.Marker;

public interface MarkerRepository extends MongoRepository<Marker, String> {
    
}
