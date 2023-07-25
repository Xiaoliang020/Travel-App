package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.Marker;

import java.util.List;

public interface MarkerRepository extends MongoRepository<Marker, String> {
    List<Marker> findByPathID(String pathid);
}
