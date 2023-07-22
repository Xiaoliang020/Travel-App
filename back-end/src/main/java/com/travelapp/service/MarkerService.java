package com.travelapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelapp.model.Marker;
import com.travelapp.repository.MarkerRepository;

@Service
public class MarkerService {
    private final MarkerRepository markerRepository;

    @Autowired
    public MarkerService(MarkerRepository markerRepository) {
        this.markerRepository = markerRepository;
    }

    public Marker saveMarker(Marker marker) {
        return markerRepository.save(marker);
    }
}
