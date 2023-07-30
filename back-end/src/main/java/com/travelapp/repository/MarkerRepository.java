package com.travelapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.travelapp.model.Marker;

import java.util.List;
import java.util.Optional;

public interface MarkerRepository extends MongoRepository<Marker, String> {
    List<Marker> findByPathID(String pathid);
    Optional<Marker> findByMarkerID(String markerID);
}
