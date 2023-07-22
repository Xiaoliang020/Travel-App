package com.travelapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelapp.model.Path;
import com.travelapp.repository.PathRepository;

import java.util.List;
import java.util.Optional;

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

    public Optional<Path> findPath(String id) {
        return pathRepository.findById(id);
    }

    public List<Path> getPathsByUserId(String userid) {
        return pathRepository.findByUserid(userid);
    }

    public boolean deletePathById(String pathId) {
        // Check if the path with the given pathId exists in the database
        if (pathRepository.existsById(pathId)) {
            pathRepository.deleteById(pathId);
            return true;
        } else {
            return false;
        }
    }
}
