package com.travelapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelapp.model.Path;
import com.travelapp.repository.PathRepository;

import java.util.List;

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

    public List<Path> getPathsByUserId(String userid) {
        return pathRepository.findByUserid(userid);
    }
}
