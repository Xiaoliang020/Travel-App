package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelapp.common.Result;
import com.travelapp.model.Path;
import com.travelapp.service.PathService;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ShareController {
    private final PathService pathService;

    @Autowired
    public ShareController(PathService pathService) {
        this.pathService = pathService;
    }

    @GetMapping("/share/{pathId}")
    public Result<?> share(@PathVariable String pathId) {
        Optional<Path> path = pathService.findPath(pathId);
        if (path != null) {
            return Result.success(path);
        } else {
            return Result.error("-1", "Share failed");
        }
    }
}