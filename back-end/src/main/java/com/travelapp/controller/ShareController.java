package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelapp.common.Result;
import com.travelapp.model.Marker;
import com.travelapp.model.Path;
import com.travelapp.service.MarkerService;
import com.travelapp.service.PathService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ShareController {
    private final PathService pathService;
    private final MarkerService markerService;


    @Autowired
    public ShareController(PathService pathService, MarkerService markerService) {
        this.pathService = pathService;
        this.markerService = markerService;
    }

    @GetMapping("/share/{pathId}")
    public Result<?> sharePath(@PathVariable String pathId) {
        Optional<Path> path = pathService.findPath(pathId);
        if (path != null) {
            return Result.success(path);
        } else {
            return Result.error("-1", "Share failed");
        }
    }

    @GetMapping("/share/marker/{pathId}")
    public Result<?> shareMarkers(@PathVariable String pathId) {
        List<Marker> markers = markerService.getPathsByUserId(pathId);
        return Result.success(markers);
    }
}