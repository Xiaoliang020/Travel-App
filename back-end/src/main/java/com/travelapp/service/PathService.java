package com.travelapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelapp.model.Path;
import com.travelapp.repository.PathRepository;

@Service
public class PathService {
    private final PathRepository pathRepository;

    @Autowired
    public PathService(PathRepository pathRepository) {
        this.pathRepository = pathRepository;
    }

    public Path savePath(Path path) {
        return pathRepository.save(path);
    }

    // Add other service methods as needed
}
