package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelapp.common.Result;
import com.travelapp.model.Path;
import com.travelapp.service.PathService;

import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
        if (pathData.getName().trim().equals("")) {
            pathData.setName("Path (" + pathData.getEndTime() + ")");
        }
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

    @PostMapping("/{pathId}/upload-screenshot")
    public Result<?> uploadScreenshot(@PathVariable String pathId, @RequestParam("screenshot") MultipartFile file) {
        try {
            String screenshotUrl = pathService.saveScreenshot(pathId, file);
            return Result.success(screenshotUrl);
        } catch (IOException e) {
            return Result.error("-1", "Failed to upload the screenshot");
        }
    }

    @GetMapping("/screenshot/{pathid}")
    public Result<?> getScreenshotByPathId(@PathVariable String pathid) {
        Optional<Path> path = pathService.findPath(pathid);
        if (path.isPresent()) {
            String screenshotUrl = path.get().getScreenshotUrl();
            try {
                byte[] screenshotData = pathService.getScreenshotDataByUrl(screenshotUrl);
                return Result.success(screenshotData);
            } catch (FileNotFoundException e) {
                return Result.error("-1", "Screenshot File not found");
            } catch (IOException e) {
                return Result.error("-1", "Output stream error");
            }
        } else {
            return Result.error("-1", "Path not found");
        }
    }
}
