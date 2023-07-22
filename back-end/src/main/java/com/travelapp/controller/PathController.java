package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelapp.common.Result;
import com.travelapp.model.Path;
import com.travelapp.service.PathService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PathController {
    private final PathService pathService;

    @Autowired
    public PathController(PathService pathService) {
        this.pathService = pathService;
    }

    @PostMapping("/path-data")
    public Result<?> savePathData(@RequestBody Path pathData) {
        // save the path info in database
        pathService.savePath(pathData);
        return Result.success(pathData.getId());
    }

    @GetMapping("/paths/{userid}")
    public Result<?> getPathsByUserId(@PathVariable String userid) {
        List<Path> userPaths = pathService.getPathsByUserId(userid);
        return Result.success(userPaths);
    }

    @PostMapping("/paths-delete")
    public Result<?> deletePath(@RequestBody Map<String, String> requestBody) {
        String pathId = requestBody.get("pathId");
        boolean deleteResult = pathService.deletePathById(pathId);
        if (deleteResult) {
            return Result.success();
        } else {
            return Result.error("-1", "Delete failed");
        }
    }
}

