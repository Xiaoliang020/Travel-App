package com.travelapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.travelapp.common.Result;
import com.travelapp.model.Marker;
import com.travelapp.service.MarkerService;

@RestController
@RequestMapping("/api")
public class MarkerController {
    private final MarkerService markerService;

    @Autowired
    public MarkerController (MarkerService markerService) {
        this.markerService = markerService;
    }

    @PostMapping("/marker-data")
    public Result<?> saveMarkerData(@RequestBody Marker markerData){
        // save the marker info in database
        markerService.saveMarker(markerData);
        return Result.success();
    }
}
