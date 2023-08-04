package com.travelapp.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.travelapp.common.Result;
import com.travelapp.model.Marker;
import com.travelapp.model.User;
import com.travelapp.service.MarkerService;

@RestController
@RequestMapping("/api")
public class MarkerController {
    private final MarkerService markerService;

    @Autowired
    public MarkerController(MarkerService markerService) {
        this.markerService = markerService;
    }

    @PostMapping("/marker-data")
    public Result<?> saveMarkerData(@RequestBody Marker markerData) {
        // save the marker info in database
        System.out.println(markerData.getMarkerLat());
        markerService.saveMarker(markerData);
        return Result.success();
    }

    @PostMapping("/upload-icon")
    public Result<?> uploadIcon(@RequestParam("file") MultipartFile file) {
        try {
            String icon = markerService.saveIcon(file);
            return Result.success(icon);
        } catch (IOException e) {
            return Result.error("-1", "Failed to upload the icon");
        }
    }

    @PostMapping("/upload-picture")
    public Result<?> uploadPicture(@RequestParam("file") MultipartFile file) {
        try {
            String picture = markerService.savePicture(file);
            return Result.success(picture);
        } catch (IOException e) {
            return Result.error("-1", "Failed to upload the picture");
        }
    }

    @GetMapping("/icon/{iconid}")
    public Result<?> getIconByIconId(@PathVariable String iconid) {
        try {
            byte[] iconData = markerService.getIconDataByIconId(iconid);
            return Result.success(iconData);
        } catch (FileNotFoundException e) {
            return Result.error("-1", "Icon File not found");
        } catch (IOException e) {
            return Result.error("-1", "Output stream error");
        }

    }

    @GetMapping("/picture/{pictureid}")
    public Result<?> getPictureByPictureId(@PathVariable String pictureid) {
        try {
            byte[] pictureData = markerService.getPictureDataByPictureId(pictureid);
            return Result.success(pictureData);
        } catch (FileNotFoundException e) {
            return Result.error("-1", "Picture File not found");
        } catch (IOException e) {
            return Result.error("-1", "Output stream error");
        }

    }

    @PostMapping("/update-marker")
    public Result<?> updateMarkerData(@RequestBody Marker markerData) {
        // update the marker info in database
        markerService.updateMarker(markerData);
        return Result.success();
    }

}
